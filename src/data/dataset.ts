export interface HealthRecord {
  id: number;
  age: number;
  gender: "Male" | "Female";
  height_cm: number;
  weight_kg: number;
  bmi: number;
  sleep_hours: number;
  physical_activity_min: number;
  daily_steps: number;
  fruit_veg_servings: number;
  water_intake_l: number;
  smoker: "Yes" | "No";
  alcohol_units_week: number;
  stress_level: number;
  resting_heart_rate: number;
  systolic_bp: number;
  healthy_lifestyle: "Yes" | "No";
}

// Embedded copy of data/health_dataset.csv (synthetic, educational)
const RAW = `1,34,Female,165,62,22.8,7.5,45,8200,5,2.1,No,2,3,68,118,Yes
2,52,Male,178,95,30.0,5.5,15,3100,2,1.2,Yes,14,7,82,142,No
3,28,Female,170,58,20.1,8.0,60,10500,6,2.5,No,0,2,60,110,Yes
4,45,Male,172,88,29.7,6.0,20,4200,3,1.5,Yes,10,6,78,138,No
5,39,Female,160,70,27.3,6.5,30,5600,4,1.8,No,4,5,72,124,Yes
6,60,Male,175,102,33.3,5.0,10,2500,1,1.0,Yes,20,8,88,150,No
7,23,Male,182,74,22.3,7.0,90,12000,5,3.0,No,3,3,58,115,Yes
8,48,Female,158,80,32.1,5.5,20,3800,2,1.3,No,6,7,80,140,No
9,31,Male,177,72,23.0,7.5,50,9000,5,2.4,No,5,3,64,120,Yes
10,55,Female,162,85,32.4,5.0,15,3300,2,1.1,Yes,8,7,84,146,No
11,27,Female,168,60,21.3,8.0,70,11000,6,2.8,No,1,2,59,108,Yes
12,42,Male,180,90,27.8,6.0,25,4800,3,1.6,Yes,12,6,76,134,No
13,36,Female,164,66,24.5,7.0,40,7500,5,2.2,No,3,4,66,119,Yes
14,58,Male,170,98,33.9,4.5,5,2000,1,0.9,Yes,18,9,90,152,No
15,29,Male,185,80,23.4,7.5,80,11500,5,3.1,No,2,3,60,114,Yes
16,50,Female,159,78,30.9,5.5,18,3600,2,1.2,No,7,7,82,141,No
17,33,Female,171,63,21.5,8.0,55,9800,6,2.6,No,0,2,61,111,Yes
18,47,Male,174,92,30.4,5.5,15,3200,2,1.3,Yes,15,7,85,144,No
19,25,Female,166,57,20.7,8.5,65,10800,6,2.9,No,1,2,57,107,Yes
20,63,Male,168,100,35.4,4.5,8,1900,1,0.8,Yes,22,9,92,156,No
21,38,Male,179,78,24.4,7.0,50,8600,4,2.3,No,4,4,65,121,Yes
22,44,Female,161,82,31.6,5.5,20,3900,2,1.4,No,5,6,79,137,No
23,30,Male,183,76,22.7,7.5,75,11200,5,3.0,No,2,3,59,113,Yes
24,54,Female,157,76,30.8,5.0,15,3400,2,1.1,Yes,9,8,83,145,No
25,26,Female,169,61,21.4,8.0,60,10200,6,2.7,No,0,2,58,109,Yes
26,49,Male,176,94,30.4,5.5,18,3500,2,1.3,Yes,13,7,84,143,No
27,35,Female,163,65,24.5,7.5,45,7900,5,2.2,No,3,4,67,120,Yes
28,57,Male,171,96,32.8,4.5,10,2300,1,0.9,Yes,17,8,88,149,No
29,24,Male,181,73,22.3,7.5,85,11800,5,3.2,No,1,2,57,112,Yes
30,46,Female,160,80,31.3,5.5,20,3700,2,1.3,No,6,7,80,139,No
31,32,Male,178,75,23.7,7.0,55,9200,5,2.4,No,3,3,63,118,Yes
32,61,Male,169,99,34.7,4.5,8,2100,1,0.9,Yes,19,9,90,153,No
33,37,Female,167,64,22.9,7.5,48,8300,5,2.3,No,2,3,65,117,Yes
34,51,Female,158,79,31.7,5.0,16,3500,2,1.2,Yes,8,7,82,142,No
35,28,Male,184,79,23.3,7.5,78,11300,5,3.0,No,2,3,58,114,Yes
36,43,Male,173,89,29.7,6.0,22,4500,3,1.6,Yes,11,6,77,135,No
37,29,Female,170,59,20.4,8.0,68,10600,6,2.8,No,0,2,58,108,Yes
38,56,Female,159,81,32.0,5.0,14,3200,2,1.1,No,7,8,83,144,No
39,40,Male,180,82,25.3,7.0,45,8000,4,2.2,No,5,4,66,122,Yes
40,64,Male,167,101,36.2,4.0,6,1800,1,0.7,Yes,24,9,94,158,No
41,31,Female,165,62,22.8,7.5,52,8900,5,2.4,No,2,3,64,116,Yes
42,48,Male,175,93,30.4,5.5,17,3400,2,1.3,Yes,14,7,85,143,No
43,27,Male,182,77,23.2,7.5,80,11400,5,3.1,No,1,3,59,113,Yes
44,53,Female,156,77,31.6,5.0,15,3300,2,1.1,Yes,9,8,84,146,No
45,34,Female,168,66,23.4,7.5,46,8100,5,2.3,No,3,4,66,119,Yes
46,59,Male,170,97,33.6,4.5,9,2200,1,0.9,Yes,18,9,89,151,No
47,25,Female,167,58,20.8,8.5,70,11000,6,2.9,No,0,2,57,106,Yes
48,45,Male,177,91,29.0,6.0,20,4300,3,1.6,Yes,12,6,78,136,No
49,36,Male,179,76,23.7,7.0,54,9100,5,2.4,No,3,3,63,118,Yes
50,62,Female,158,84,33.7,4.5,10,2400,1,0.9,Yes,10,8,86,148,No`;

export const COLUMNS = [
  "id", "age", "gender", "height_cm", "weight_kg", "bmi", "sleep_hours",
  "physical_activity_min", "daily_steps", "fruit_veg_servings", "water_intake_l",
  "smoker", "alcohol_units_week", "stress_level", "resting_heart_rate",
  "systolic_bp", "healthy_lifestyle",
];

export const dataset: HealthRecord[] = RAW.trim().split("\n").map((line) => {
  const c = line.split(",");
  return {
    id: +c[0], age: +c[1], gender: c[2] as "Male" | "Female",
    height_cm: +c[3], weight_kg: +c[4], bmi: +c[5], sleep_hours: +c[6],
    physical_activity_min: +c[7], daily_steps: +c[8], fruit_veg_servings: +c[9],
    water_intake_l: +c[10], smoker: c[11] as "Yes" | "No",
    alcohol_units_week: +c[12], stress_level: +c[13], resting_heart_rate: +c[14],
    systolic_bp: +c[15], healthy_lifestyle: c[16] as "Yes" | "No",
  };
});

export const NUMERIC_COLUMNS = [
  "age", "height_cm", "weight_kg", "bmi", "sleep_hours",
  "physical_activity_min", "daily_steps", "fruit_veg_servings",
  "water_intake_l", "alcohol_units_week", "stress_level",
  "resting_heart_rate", "systolic_bp",
] as const;

export type NumericColumn = (typeof NUMERIC_COLUMNS)[number];
