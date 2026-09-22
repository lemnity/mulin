"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "mulin:participants";

export type Participant = {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  phone: string;
};

type Listener = () => void;

let roster: Participant[] = [];
let hydrated = false;
const listeners = new Set<Listener>();

function readFromStorage(): Participant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeToStorage(list: Participant[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore unavailable storage
  }
}

function setRoster(updater: (prev: Participant[]) => Participant[]) {
  roster = updater(roster);
  writeToStorage(roster);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (!hydrated) {
    roster = readFromStorage();
    hydrated = true;
  }
  return roster;
}

function getServerSnapshot() {
  return roster;
}

export function useParticipants() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addParticipant = useCallback((data: Omit<Participant, "id">) => {
    const participant: Participant = { ...data, id: `pt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setRoster((prev) => [...prev, participant]);
    return participant;
  }, []);

  const removeParticipant = useCallback((id: string) => {
    setRoster((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { roster: list, addParticipant, removeParticipant };
}
