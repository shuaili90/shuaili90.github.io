// Research projects shown on the lab homepage, in display order.
// Each card links to its own project website; images live in public/images/.
export interface Project {
  id: string;
  topic: string;
  title: string;
  description: string;
  url: string;
  image: string;
  width: number;
  height: number;
  alt: string;
}

const site = "https://shuaili90.github.io";

export const projects: Project[] = [
  {
    id: "hoist",
    topic: "Humanoid robots · Construction",
    title: "HOIST: Humanoid Optimization with Imitation and Sample-Efficient Tuning for Manipulating Suspended Loads",
    description: "Combining VR demonstrations, vision-language-action policies, and reinforcement learning to guide suspended loads with a humanoid robot.",
    url: `${site}/humanoid-hoisting/`,
    image: "hoist.webp", width: 1200, height: 612,
    alt: "Three physical humanoid trials, labeled VLA-50, VLA-80, and HOIST, guiding a suspended block toward a marked platform.",
  },
  {
    id: "roofing",
    topic: "Humanoid robots · Construction",
    title: "Learning Slope-Adaptive Whole-Body Locomotion for Humanoid Robots in Roofing Construction",
    description: "Learning coordinated slope traversal, working postures, and tool positioning from human roofing demonstrations.",
    url: `${site}/humanoid_roofing/`,
    image: "roofing.webp", width: 1200, height: 672,
    alt: "Four sequences of a Unitree G1 stepping, bending, and reaching on a laboratory slope while attached to a safety hoist.",
  },
  {
    id: "architected-structures",
    topic: "Robotic construction · Architected structures",
    title: "Robot-Aware Design and Assembly of Architected Structures",
    description: "Co-designing architected structures, assembly-aware structural interfaces, and robotic construction for diverse engineering environments.",
    url: `${site}/architected-structures/`,
    image: "architected.webp", width: 1200, height: 675,
    alt: "Diamond, gyroid, and primitive porous modules in a geometric assembly visualization.",
  },
  {
    id: "surgical-robotics",
    topic: "Surgical robotics · Agentic AI",
    title: "Agentic and Bioinspired Robotics for Minimally Invasive Surgery",
    description: "Magnetically actuated surgical cameras, bioinspired optical maintenance, and agentic AI for surgeon-supervised robotic assistance.",
    url: `${site}/agentic-robotics_surgeons/`,
    image: "surgery.webp", width: 617, height: 347,
    alt: "Drawing of a robot-mounted external actuator above an abdominal model, coupled to an internal camera, with the actuator and camera shown separately.",
  },
  {
    id: "healthy-buildings",
    topic: "Digital twins · Indoor health",
    title: "Digital Twins for Healthy Built Environments",
    description: "Digital twins, environmental sensing, and social robotics for healthier, more responsive built environments.",
    url: `${site}/digitaltwin_healthybuilding/`,
    image: "healthy.webp", width: 1200, height: 673,
    alt: "An overhead digital building model with rooms, furniture, and layered services.",
  },
  {
    id: "school-communities",
    topic: "School health · Community engagement",
    title: "Disease-Resistant School Communities",
    description: "Environmental sensing, microbiome analysis, computational modeling, and community engagement for healthier, more resilient schools.",
    url: `${site}/disease-resistant-school-communities/`,
    image: "school.webp", width: 1200, height: 675,
    alt: "An animated classroom with a teacher, students, an air-handling unit, and symbolic airborne particles, from the school research film.",
  },
  {
    id: "mixed-traffic",
    topic: "Multi-agent learning · Mobility",
    title: "Network-Scale Mixed-Traffic Control with Multi-Agent Reinforcement Learning",
    description: "Coordinating human-driven vehicles, robot vehicles, and traffic signals across urban road networks.",
    url: `${site}/mixed_traffic/`,
    image: "mixed-traffic.webp", width: 735, height: 444,
    alt: "Map of the 14-intersection Colorado Springs study network, with numbered intersections and enlarged road layouts.",
  },
  {
    id: "air-mobility",
    topic: "Learning for flight · Mobility",
    title: "Learning-Based Motion Planning for Advanced Air Mobility in Complex Urban Wind Fields",
    description: "Wind-aware, multi-objective motion planning that balances safety, energy efficiency, passenger comfort, travel time, and noise.",
    url: `${site}/wind-aware-air-mobility/`,
    image: "air-mobility.webp", width: 854, height: 480,
    alt: "A small four-rotor drone trails a broad yellow flight path above a street between multistory buildings in a simulated city.",
  },
];
