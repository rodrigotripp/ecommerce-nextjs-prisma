import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

type DashboardCardProps = {
  title: string
  subtitle: string
  body: string
}

export function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}