import { getTeamById } from "@/src/entity/team"
import { ProjectRecentActivity } from "@/src/widgets/project-recent-activity"
import { Metadata } from "next"

interface TeamDashboardPageProps {
  params: Promise<{ teamId: string }>
}

export async function generateMetadata(
  params: TeamDashboardPageProps
): Promise<Metadata> {
  const { teamId } = await params.params

  const { data } = await getTeamById(teamId)

  return {
    title: data?.name || "Team Dashboard",
    description: "Manage your team's projects and tasks.",
  }
}

export default async function TeamDashboardPage({
  params,
}: TeamDashboardPageProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 2xl:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-9">
          <ProjectRecentActivity />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-1 2xl:col-span-3">
          {/* <ProjectStatsEntry stats={stats} /> */}
          {/* 
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-medium">
                Team Members
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {MOCK_MEMBERS.filter((m) => m.isOnline).length} online
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {MOCK_MEMBERS.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Аватар с индикатором статуса 
                      <div className="relative shrink-0">
                        <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground uppercase">
                          {member.name[0]}
                        </div>
                        <span
                          className={`absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-background ${
                            member.isOnline ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs leading-none font-medium">
                          {member.name}
                        </span>
                        <span className="mt-0.5 text-[10px] text-muted-foreground">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {member.isOnline ? (
                        <span className="text-[10px] font-medium text-emerald-500">
                          Online
                        </span>
                      ) : (
                        <span className="text-[10px]">{member.lastSeen}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </section>
  )
}
