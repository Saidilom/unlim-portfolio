"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  ExternalLink,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowUp,
  MessageCircle,
  Code2,
  Palette,
  Database,
  Smartphone,
  Globe,
  Zap,
} from "lucide-react"


const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export default function Portfolio() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)

 
  const testimonials = useMemo(
    () => [
      {
        name: "Владелец S&I Hotel",
        role: "Бизнес",
        content:
          "Система управления отелем превзошла все ожидания! Теперь мы можем отслеживать все финансы и бронирования в реальном времени.",
        rating: 5,
        avatar: "SH",
        project: "Hotel Management System",
      },
      {
        name: "Заказчик Nike Landing",
        role: "Маркетинг",
        content:
          "Отличная работа над лендингом! Современный дизайн и быстрая загрузка. Конверсия увеличилась на 40% после запуска.",
        rating: 5,
        avatar: "NK",
        project: "Nike Landing Page",
      },
      {
        name: "Клиент Photo Gallery",
        role: "Фотограф",
        content:
          "Потрясающая галерея для моих работ! Красивые анимации и удобная навигация. Именно то, что нужно для портфолио.",
        rating: 5,
        avatar: "PG",
        project: "Photo Gallery",
      },
    ],
    [],
  )

  const projects = useMemo(
    () => [
      {
        title: "Hotel Management System",
        description: "Полноценная система управления отелем с аналитикой и финансами",
        tech: ["React", "Next.js", "TypeScript", "PostgreSQL"],
        image: "/images/hotel-dashboard.png",
        status: "Завершен",
        link: "https://github.com/Saidilom",
        category: "Full Stack",
      },
      {
        title: "Banking Panel",
        description: "Интерфейс банковской панели с управлением транзакциями",
        tech: ["Vue.js", "Node.js", "MongoDB"],
        image: "/images/banking-panel.png",
        status: "Завершен",
        link: "https://github.com/Saidilom",
        category: "Frontend",
      },
      {
        title: "Creative Portfolio",
        description: "Современный портфолио сайт с анимациями и интерактивностью",
        tech: ["React", "Three.js", "GSAP"],
        image: "/images/portfolio-site.png",
        status: "В разработке",
        link: "https://github.com/Saidilom",
        category: "Creative",
      },
    ],
    [],
  )

  const skills = useMemo(
    () => [
      { name: "Frontend", level: 95, icon: Code2, color: "from-blue-500 to-cyan-500" },
      { name: "Backend", level: 88, icon: Database, color: "from-green-500 to-emerald-500" },
      { name: "Mobile", level: 82, icon: Smartphone, color: "from-purple-500 to-pink-500" },
      { name: "UI/UX", level: 78, icon: Palette, color: "from-orange-500 to-red-500" },
      { name: "Web3", level: 75, icon: Globe, color: "from-yellow-500 to-orange-500" },
      { name: "DevOps", level: 80, icon: Zap, color: "from-indigo-500 to-purple-500" },
    ],
    [],
  )

  const navItems = useMemo(
    () => [
      { href: "#home", label: "Главная" },
      { href: "#about", label: "О себе" },
      { href: "#projects", label: "Проекты" },
      { href: "#testimonials", label: "Отзывы" },
      { href: "#contact", label: "Контакты" },
    ],
    [],
  )

  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setShowScrollTop(currentScrollY > 500)

      
      const sections = navItems.map((item) => item.href.replace("#", ""))
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }, 16), 
    [navItems],
  )

 
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }, [])

 
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000) // Reduced loading time
    return () => clearTimeout(timer)
  }, [])

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent animate-pulse-scale">
            Unlim_Lawe
          </div>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Simplified floating background - removed heavy parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-white/3 to-transparent rounded-full blur-3xl animate-float top-1/4 left-1/10" />
        <div className="absolute w-96 h-96 bg-gradient-to-l from-white/2 to-transparent rounded-full blur-3xl animate-float-delayed bottom-1/4 right-1/10" />
        <div className="absolute w-4 h-4 bg-white/10 rounded-full animate-pulse top-1/3 left-1/5" />
        <div className="absolute w-6 h-6 border border-white/10 rotate-45 animate-spin-slow top-3/5 right-1/3" />
        <div className="absolute w-3 h-3 bg-white/20 rounded-full animate-bounce-slow bottom-2/5 left-7/10" />
      </div>

      {/* Optimized Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-white/5 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div
              className="text-xl font-bold cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => scrollToSection("#home")}
            >
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Unlim_Lawe</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.href.replace("#", "") ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.replace("#", "") && (
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-white" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
              isMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col space-y-3 py-4 border-t border-white/10">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.href.replace("#", "") ? "text-white" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - simplified animations */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="text-sm text-gray-400 mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Привет, меня зовут
            </div>
            <h1
              className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Unlim_Lawe
              </span>
            </h1>
            <div
              className="text-lg sm:text-xl lg:text-2xl font-light text-gray-300 mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              Full Stack Developer
            </div>
          </div>

          <p
            className="text-base sm:text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            Создаю современные веб-приложения с фокусом на производительность и пользовательский опыт. Превращаю идеи в
            цифровые решения.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("#projects")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Посмотреть работы
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("#contact")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Связаться
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in-up"
            style={{ animationDelay: "1.2s" }}
          >
            {[
              { number: "15+", label: "Проектов" },
              { number: "3+", label: "Года опыта" },
              { number: "23+", label: "Клиентов" },
            ].map((stat, index) => (
              <div key={index} className="text-center transition-transform duration-300 hover:scale-110">
                <div className="text-2xl sm:text-3xl font-bold">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Simplified Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div
            className="w-5 h-8 border border-white/30 rounded-full flex justify-center cursor-pointer transition-all duration-300 hover:border-white/60"
            onClick={() => scrollToSection("#about")}
          >
            <div className="w-px h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section - optimized */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">О себе</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Full Stack разработчик с 3+ годами опыта создания веб-приложений. Специализируюсь на современных
                технологиях и создании качественных решений.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Мой подход основан на понимании бизнес-потребностей и технических требований, что позволяет создавать
                продукты, которые решают реальные задачи.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <skill.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-1.5 rounded-full animate-scale-x`}
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${0.6 + index * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent group">
                <img
                  src="/images/office-sunset.jpg"
                  alt="Рабочее место"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - optimized */}
      <section id="projects" className="py-16 sm:py-20 bg-white/5 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Мои проекты</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-black/50 border-white/10 hover:border-white/20 transition-all duration-500 group hover:scale-105 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          project.status === "Завершен"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-xs bg-white/5 border-white/20 text-white/80"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-white/60">
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Посмотреть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => window.open("https://github.com/Saidilom", "_blank")}
            >
              <Github className="w-4 h-4 mr-2" />
              Все проекты на GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - optimized */}
      <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Отзывы клиентов
            </span>
          </h2>

          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center text-lg font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                </div>

                <Quote className="w-8 h-8 mx-auto mb-4 text-white/40" />

                <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </p>

                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="text-white font-semibold">{testimonials[currentTestimonial].name}</div>
                <div className="text-sm text-gray-400">{testimonials[currentTestimonial].role}</div>
                <div className="text-xs text-gray-500 mt-1">Проект: {testimonials[currentTestimonial].project}</div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 border-white/20 text-white hover:bg-white hover:text-black"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 border-white/20 text-white hover:bg-white hover:text-black"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-white scale-125" : "bg-white/30"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - optimized */}
      <section id="contact" className="py-16 sm:py-20 bg-white/5 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Связаться со мной
            </span>
          </h2>

          <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Готов обсудить ваш проект и помочь воплотить идеи в жизнь. Свяжитесь со мной любым удобным способом.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: MessageCircle,
                title: "Telegram",
                content: "@Unlim_lawe",
                link: "https://t.me/Unlim_lawe",
              },
              {
                icon: Github,
                title: "GitHub",
                content: "github.com/Saidilom",
                link: "https://github.com/Saidilom",
              },
            ].map((contact, index) => (
              <Card
                key={index}
                className="bg-black/50 border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer backdrop-blur-sm hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                onClick={() => window.open(contact.link, "_blank")}
              >
                <CardContent className="p-6 text-center">
                  <contact.icon className="w-8 h-8 mx-auto mb-4 text-white/60" />
                  <h3 className="font-semibold mb-2">{contact.title}</h3>
                  <p className="text-sm text-gray-400">{contact.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300"
              onClick={() => window.open("https://t.me/Unlim_lawe", "_blank")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Написать в Telegram
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => window.open("https://github.com/Saidilom", "_blank")}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-4 sm:mb-0">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Unlim_Lawe</span>
            </div>
            <div className="text-gray-400 text-center sm:text-right">
              <p className="text-sm">&copy; 2024 Unlim_Lawe. Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <Button
          onClick={scrollToTop}
          className="bg-white text-black hover:bg-gray-200 transition-all duration-300 rounded-full p-3 shadow-lg"
          size="icon"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
