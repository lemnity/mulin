import { audienceRoles, speakerRoster, type ProgramFormat, type ProgramType } from "@/lib/programs";
import { FilterCheckboxGroup } from "@/components/filter-checkbox-group";
import { FilterDropdown } from "@/components/filter-dropdown";
import { IconReset } from "@/components/icons";

const typeOptions: ProgramType[] = ["Семинар", "Курс", "Вебинар"];
const formatOptions: ProgramFormat[] = ["Онлайн", "Очно"];

export type FiltersState = {
  types: ReadonlySet<ProgramType>;
  formats: ReadonlySet<ProgramFormat>;
  audiences: ReadonlySet<string>;
  speakers: ReadonlySet<string>;
  dateFrom: string;
  dateTo: string;
};

export function FiltersPanel({
  state,
  onToggleType,
  onToggleFormat,
  onToggleAudience,
  onToggleSpeaker,
  onDateFromChange,
  onDateToChange,
  onReset,
  hasActiveFilters,
}: {
  state: FiltersState;
  onToggleType: (v: ProgramType) => void;
  onToggleFormat: (v: ProgramFormat) => void;
  onToggleAudience: (v: string) => void;
  onToggleSpeaker: (v: string) => void;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}) {
  const periodCount = (state.dateFrom ? 1 : 0) + (state.dateTo ? 1 : 0);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterDropdown label="Тип" count={state.types.size}>
        <FilterCheckboxGroup
          options={typeOptions}
          selected={state.types}
          onToggle={(v) => onToggleType(v as ProgramType)}
        />
      </FilterDropdown>

      <FilterDropdown label="Специализация" count={state.audiences.size} panelClassName="w-80">
        <FilterCheckboxGroup
          options={audienceRoles}
          selected={state.audiences}
          onToggle={onToggleAudience}
          scroll
        />
      </FilterDropdown>

      <FilterDropdown label="Формат" count={state.formats.size}>
        <FilterCheckboxGroup
          options={formatOptions}
          selected={state.formats}
          onToggle={(v) => onToggleFormat(v as ProgramFormat)}
        />
      </FilterDropdown>

      <FilterDropdown label="Период" count={periodCount} panelClassName="w-64">
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 text-sm text-ink">
            <span className="w-6 shrink-0">с</span>
            <input
              type="date"
              value={state.dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <span className="w-6 shrink-0">по</span>
            <input
              type="date"
              value={state.dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink"
            />
          </label>
        </div>
      </FilterDropdown>

      <FilterDropdown label="Лектор" count={state.speakers.size} panelClassName="w-72">
        <FilterCheckboxGroup
          options={speakerRoster}
          selected={state.speakers}
          onToggle={onToggleSpeaker}
          scroll
        />
      </FilterDropdown>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 whitespace-nowrap px-2 py-2 text-sm font-medium text-blue hover:text-blue-dark"
        >
          <IconReset className="h-4 w-4" />
          Сбросить
        </button>
      )}
    </div>
  );
}
