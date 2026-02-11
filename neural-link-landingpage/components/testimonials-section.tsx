import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Neural Interface Researcher",
    avatar: "/professional-woman-scientist.png",
    content:
      "The neural processing capabilities have revolutionized our research. We're achieving breakthroughs that seemed impossible just months ago.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Quantum Security Specialist",
    avatar: "/cybersecurity-expert-man.jpg",
    content:
      "The quantum security protocols provide peace of mind in an increasingly connected world. Truly next-generation protection.",
  },
  {
    name: "Dr. Yuki Tanaka",
    role: "AR/VR Developer",
    avatar: "/asian-woman-tech-developer.jpg",
    content:
      "The holographic interface is intuitive beyond belief. It's like the technology reads your mind and responds accordingly.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-sans">Trusted by Innovators</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            See what industry leaders are saying about our revolutionary technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
