export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  label: string;
}

export interface Project {
  slug: string;
  ref: string;
  title: string;
  subtitle: string;
  categories: string[];
  description: string[];
  stack: string[];
  media: MediaItem[];
  hasVideo: boolean;
  hasGithub: boolean;
  githubUrl?: string;
  wip?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'firefighter',
    ref: 'Q1',
    title: 'Inferno-1400',
    subtitle: 'Autonomous Firefighter Robot',
    categories: ['Robotics'],
    hasVideo: true,
    hasGithub: false,
    description: [
      'Inferno-1400 is an autonomous robot I built that navigates a maze containing walls, lines, and a lit candle somewhere inside. Using a combination of flame sensors and infrared sensors, the robot detects and locates the candle, then uses a fan to extinguish it.',
      'I designed and built everything end to end: the chassis from scratch, the custom PCBs in TraxMaker, all the sensor wiring, and every line of code. The robot uses line sensors to follow the maze floor markings and wall sensors to avoid collisions while searching each room systematically.',
      'One of my favourite projects. Watching it actually find and blow out the candle for the first time was genuinely exciting.',
    ],
    stack: ['Arduino', 'C++', 'TraxMaker', 'IR Sensors', 'Flame Sensor', 'AutoCAD', 'Custom PCB'],
    media: [
      { type: 'video', src: '/media/firefighter_first_candle.mp4', label: 'First Candle' },
      { type: 'video', src: '/media/firefighter_candle_2.mp4', label: 'Second Candle' },
      { type: 'image', src: '/media/firefighter_bot.jpg', label: 'Robot' },
      { type: 'image', src: '/media/firefighter_sensor_board.jpg', label: 'Sensor Board' },
      { type: 'image', src: '/media/firefighter_circuit_board.jpg', label: 'Circuit Board' },
    ],
  },
  {
    slug: 'hrvita',
    ref: 'U2',
    title: 'HRVita',
    subtitle: 'Wrist-Wearable Delirium IoT Screening System',
    categories: ['IoT', 'Health Tech', 'Team Project'],
    hasVideo: true,
    hasGithub: true,
    githubUrl: 'https://github.com/IshaanMittal07/HrVita',
    description: [
      'HRVita is a clinical-backed IoT system built to predict hospital-induced delirium 2 to 4 hours before it occurs. The system uses an ESP32-C3 and MAX30102 sensor to collect Heart Rate Variability and SpO2 data from the patient\'s wrist in real time.',
      'Data streams to a web dashboard where clinicians can view live readings, trend charts, and delirium risk scores. We also built an AI assistant interface that answers questions about the patient\'s HRV data and monitoring status.',
      'Built with a team of first-year students as part of my project course at UWaterloo. I worked on the hardware side including the ESP32 integration, sensor wiring, and data transmission.',
    ],
    stack: ['ESP32-C3', 'MAX30102', 'C++', 'WiFi/LAN', 'Data Analysis', 'Web Dashboard', 'AI Chatbot', 'LiPo Battery', 'Soldering'],
    media: [
      { type: 'image', src: '/media/hrvita_main.jpg', label: 'Dashboard' },
      { type: 'image', src: '/media/hrvita_ai.jpg', label: 'AI Assistant' },
      { type: 'video', src: '/media/hrvita_demo.mp4', label: 'Live Demo' },
    ],
  },
  {
    slug: 'frenzyflyer',
    ref: 'SW3',
    title: 'Frenzy Flyer',
    subtitle: 'Python Arcade Game',
    categories: ['Game Dev', 'Python'],
    hasVideo: true,
    hasGithub: true,
    githubUrl: 'https://github.com/ahmadAldirieh/FrenzyFlyer',
    description: [
      'Frenzy Flyer is a Python arcade game built with Pygame. The player navigates a flying character through an endless stream of obstacles, surviving as long as possible while the difficulty ramps up.',
      'Building this sharpened my understanding of game loop design, frame-rate-independent physics, collision detection, and event-driven programming.',
    ],
    stack: ['Python', 'Pygame', 'Game Loop Design', 'Collision Detection'],
    media: [
      { type: 'video', src: '/media/frenzy_flyer.mp4', label: 'Gameplay' },
      { type: 'image', src: '/media/frenzy_menu.jpg', label: 'Menu' },
      { type: 'image', src: '/media/frenzy_powerups.jpg', label: 'Power Ups' },
    ],
  },
  {
    slug: 'sumo',
    ref: 'Q4',
    title: 'Sumo Wrestling Robot',
    subtitle: 'Combat Robot',
    categories: ['Robotics'],
    hasVideo: true,
    hasGithub: false,
    description: [
      'A combat robot that competed in sumo-style robot battles. The goal: push the opponent out of the ring before they push you out. The robot uses infrared sensors pointed forward to detect opposing robots and IR sensors pointed downward to detect the ring boundary line.',
      'I built the entire thing from scratch: designed and cut the chassis, wired all the components, designed the custom PCB in TraxMaker, and wrote all the code in Great Cow BASIC.',
      'My strategy was deliberate: the robot spins in place continuously until its front-facing IR sensor detects an opponent. The moment it gets a reading, it locks on and charges full speed. This means the robot never has its back exposed for long — always rotating, always hunting.',
    ],
    stack: ['Great Cow BASIC', 'IR Sensors', 'TraxMaker', 'Custom PCB', 'Chassis Design'],
    media: [
      { type: 'image', src: '/media/sumo_bot.jpg', label: 'Robot' },
      { type: 'video', src: '/media/sumo_battle.mp4', label: 'Battle' },
    ],
  },
  {
    slug: 'linefollower',
    ref: 'Q5',
    title: 'Line Follower Robot',
    subtitle: 'Autonomous Sensor-Driven Robot',
    categories: ['Robotics'],
    hasVideo: false,
    hasGithub: false,
    description: [
      'A robot that autonomously follows a line on the ground using IR reflectance sensors. The sensors detect the contrast between the line and the floor surface, and the control logic adjusts motor speeds to keep the robot centered.',
      'The project focused on sensor calibration and reliable control logic to handle curves and varying surface conditions. Built and programmed from scratch including a custom PCB designed in TraxMaker.',
    ],
    stack: ['IR Sensors', 'Control Logic', 'Custom PCB', 'TraxMaker'],
    media: [
      { type: 'image', src: '/media/line_follower.jpg', label: 'Robot' },
    ],
  },
  {
    slug: 'fullstack',
    ref: 'IC6',
    title: 'Full-Stack Project',
    subtitle: 'Coming Soon',
    categories: ['Coming Soon'],
    hasVideo: false,
    hasGithub: false,
    wip: true,
    description: ['A software project with a full frontend and backend. Details dropping soon.'],
    stack: [],
    media: [],
  },
];

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug);
}
