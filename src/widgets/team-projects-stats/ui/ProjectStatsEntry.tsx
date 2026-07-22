import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui"
import { FolderOpen, ListTodo } from "lucide-react"

interface ProjectStatsEntryProps {
  stats: {
    projects: number
    todos: number
  }
}

export const ProjectStatsEntry = ({ stats }: ProjectStatsEntryProps) => {
  return (
    <div className="grid h-fit gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <FolderOpen className="size-4" />
            Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{stats.projects}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <ListTodo className="size-4" />
            Open Todos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{stats.todos}</p>
        </CardContent>
      </Card>
    </div>
  )
}
