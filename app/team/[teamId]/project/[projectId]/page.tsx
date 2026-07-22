export default async function ProjectPage({
  params,
}: {
  params: Promise<{ teamId: string; projectId: string }>
}) {
  return (
    <div className="container mx-auto min-h-svh px-2">
      <h1>Project Page</h1>
    </div>
  )
}
