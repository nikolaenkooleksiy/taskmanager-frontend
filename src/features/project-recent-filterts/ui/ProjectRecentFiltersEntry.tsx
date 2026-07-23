import { FILTERS } from "../model/const/FILTER_ITEMS"
import {
  FilterItem,
  ProjectRecentFilterList,
  ProjectRecentFiltersLayout,
  ProjectRecentSearchBar,
} from "./ProjectRecentFiltersLayout"

export const ProjectRecentFiltersEntry = () => {
  return (
    <ProjectRecentFiltersLayout>
      <ProjectRecentSearchBar />

      <ProjectRecentFilterList>
        {FILTERS.map((filter) => (
          <FilterItem key={filter}>{filter}</FilterItem>
        ))}
      </ProjectRecentFilterList>
    </ProjectRecentFiltersLayout>
  )
}
