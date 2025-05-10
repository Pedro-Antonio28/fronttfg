"use client"

import { ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import imagenPrueba from '@/shared/assets/images/imagenPrueba.jpeg';

const Card = ({ className, children, ...props }) => {
  return (
    <div className={`rounded-lg bg-white shadow-sm ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={`${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={`${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({ className, children, ...props }) => {
  return (
    <div className={`${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const Avatar = ({ className, children, ...props }) => {
  return (
    <div className={`relative flex shrink-0 overflow-hidden rounded-full ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const AvatarImage = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt || ""}
      className={`aspect-square h-full w-full object-cover ${className || ""}`}
      {...props}
    />
  )
}

const AvatarFallback = ({ className, children, ...props }) => {
  return (
    <div className={`flex h-full w-full items-center justify-center ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const Button = ({ variant, className, children, ...props }) => {
  const variantClasses = {
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    default: "bg-purple-600 text-white hover:bg-purple-700",
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${variantClasses[variant || "default"]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function ClassCard({ classItem, index }) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  // Función para obtener las iniciales del nombre
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  return (
      <motion.div
          variants={item}
          whileHover={{
            y: -5,
            transition: { duration: 0.2 },
          }}
      >
        <div
            className="block cursor-pointer"
            onClick={() => {
              localStorage.setItem("selectedClassName", classItem.class_name);
              document.title = classItem.class_name;
              window.location.href = `/student/class/${classItem.id}`;


            }}


        >
          <Card className="overflow-hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <CardHeader className="p-0">
              <motion.div
                  className="h-24 w-full bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-700 dark:to-purple-900"
                  style={{
                    backgroundImage: classItem.backgroundImage
                        ? `linear-gradient(rgba(109, 40, 217, 0.8), rgba(109, 40, 217, 0.8)), url(${classItem.backgroundImage})`
                        : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  whileHover={{
                    backgroundPosition: "center 45%",
                    transition: { duration: 3 },
                  }}
              />
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Avatar className="h-16 w-16 border-4 border-white -mt-12 shadow-sm">
                    <AvatarImage src={classItem.teacherImage || imagenPrueba} alt="profesor" />
                    <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200">
                      {getInitials("Jose Luis Torrente")}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold text-lg">{classItem.class_name}</h3>
                  <p className="text-sm text-muted-foreground">Prof. Jose Luis Torrente</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 dark:bg-slate-800 px-6 py-3">
              <motion.div className="ml-auto" whileHover={{ x: 3 }} whileTap={{ scale: 0.95 }}>
                <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-xs text-purple-700 hover:cursor-pointer hover:bg-purple-50 hover:text-purple-800 dark:hover:bg-slate-700 dark:hover:text-purple-300"
                >
                  Ver detalles
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
  );
}
