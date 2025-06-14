'use client';

import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import imagenPrueba from '@/shared/assets/images/imagenPrueba.jpeg';
import { PieChart, Pie, Cell } from 'recharts';

const Card = ({ className, children, ...props }) => (
  <div className={`rounded-lg bg-white shadow-sm ${className || ''}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }) => (
  <div className={`${className || ''}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={`${className || ''}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className, children, ...props }) => (
  <div className={`${className || ''}`} {...props}>
    {children}
  </div>
);

const Avatar = ({ className, children, ...props }) => (
  <div
    className={`relative flex shrink-0 overflow-hidden rounded-full ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

const AvatarImage = ({ src, alt, className, ...props }) => (
  <img
    src={src || '/placeholder.svg'}
    alt={alt || ''}
    className={`aspect-square h-full w-full object-cover ${className || ''}`}
    {...props}
  />
);

const AvatarFallback = ({ className, children, ...props }) => (
  <div className={`flex h-full w-full items-center justify-center ${className || ''}`} {...props}>
    {children}
  </div>
);

const Button = ({ variant, className, children, ...props }) => {
  const variantClasses = {
    ghost: 'hover:bg-slate-100 hover:text-slate-900',
    default: 'bg-purple-600 text-white hover:bg-purple-700',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${variantClasses[variant || 'default']} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function ClassCard({ classItem, index, rol }) {
  const navigate = useNavigate();

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  const goToClass = () => {
    localStorage.setItem('selectedClassName', classItem.class_name);
    document.title = classItem.class_name;

    const baseRoute =
      rol === 'teacher' || rol === 'director' ? '/teacher/class/' : '/student/class/';

    navigate(`${baseRoute}${classItem.id}`);
  };

  function adjustColorBrightness(hex, amount) {
    return (
      '#' +
      hex
        .replace(/^#/, '')
        .replace(/../g, (color) =>
          ('0' + Math.max(0, Math.min(255, parseInt(color, 16) + amount)).toString(16)).slice(-2)
        )
    );
  }

  const baseColor = classItem.color || '#6d28d9';
  const fromLight = adjustColorBrightness(baseColor, 60); // un poco más claro
  const toLight = adjustColorBrightness(baseColor, -20); // base
  const fromDark = adjustColorBrightness(baseColor, -40); // más oscuro
  const toDark = adjustColorBrightness(baseColor, -80); // aún más oscuro

  const mark = Math.min(Math.max(classItem.mark ?? 0, 0), 10); // aseguramos que esté entre 0 y 10
  const pieData = [
    { name: 'Nota', value: mark },
    { name: 'Restante', value: 10 - mark },
  ];

  const pieColors = [baseColor, '#e5e7eb']; // color y gris claro

  return (
    <motion.div
      variants={item}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      <div onClick={goToClass} className="block cursor-pointer">
        <Card className="overflow-hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <CardHeader className="p-0 relative">
            {/* Claro */}
            <div
              className="h-24 w-full block dark:hidden"
              style={{
                backgroundImage: `linear-gradient(to right, ${fromDark}, ${toDark})`,
              }}
            />

            {/* Oscuro */}
            <div
              className="h-24 w-full hidden dark:block"
              style={{
                backgroundImage: `linear-gradient(to right, ${fromLight}, ${toLight})`,
                filter: 'brightness(0.7)',
              }}
            />
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Avatar className="h-16 w-16 border-4 border-white -mt-12 shadow-sm">
                    <AvatarImage src={classItem.teacherImage || imagenPrueba} alt="profesor" />
                    <AvatarFallback className="text-white" style={{ backgroundColor: baseColor }}>
                      {getInitials('Jose Luis Torrente')}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold text-lg">{classItem.class_name}</h3>
                  <p className="text-sm text-muted-foreground">Prof. Jose Luis Torrente</p>
                </div>
              </div>

              {/* Pie chart */}
              <div className="flex flex-col items-center justify-center w-20">
                <PieChart width={60} height={60}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={20}
                    outerRadius={30}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <span className="text-xs text-muted-foreground mt-1">{mark.toFixed(1)}/10</span>
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
