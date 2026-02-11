import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Neural Processing",
    description: "Advanced AI algorithms that adapt and learn from your interactions in real-time.",
    icon: "🧠",
    badge: "AI-Powered",
  },
  {
    title: "Quantum Security",
    description: "Military-grade encryption with quantum-resistant protocols for ultimate protection.",
    icon: "🔒",
    badge: "Secure",
  },
  {
    title: "Holographic Interface",
    description: "Immersive 3D interfaces that respond to gesture and voice commands seamlessly.",
    icon: "🌐",
    badge: "Immersive",
  },
  {
    title: "Temporal Analytics",
    description: "Predictive insights that analyze patterns across multiple timeline dimensions.",
    icon: "⚡",
    badge: "Predictive",
  },
  {
    title: "Bio-Sync Integration",
    description: "Seamless integration with biological systems for enhanced human-machine interaction.",
    icon: "🔗",
    badge: "Connected",
  },
  {
    title: "Reality Mesh",
    description: "Blend digital and physical worlds with our advanced augmented reality framework.",
    icon: "🎯",
    badge: "AR/VR",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Next-Generation Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the future with cutting-edge technology that redefines what's possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{feature.icon}</span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
