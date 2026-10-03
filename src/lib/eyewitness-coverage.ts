/**
 * Polling-unit counts aggregated by state from the 176,846-row INEC IReV-derived
 * dataset: https://github.com/Emeka-Onwuepe/Polling_Units_in_Nigeria
 * NGelectionpolls.org publicly describes coverage as "176,000+ polling units",
 * but does not publish state-by-state reporter registration totals.
 */
export const REPORTERS_PER_UNIT = 5;
export const POLLING_UNITS: Record<string, number> = {
  abia: 4062, adamawa: 4104, akwaibom: 4353, anambra: 5720,
  bauchi: 5423, bayelsa: 2244, benue: 5102, borno: 5071,
  crossriver: 3281, delta: 5863, ebonyi: 2946, edo: 4519,
  ekiti: 2445, enugu: 4145, fct: 2822, gombe: 2988,
  imo: 4758, jigawa: 4522, kaduna: 8012, kano: 11222,
  katsina: 6652, kebbi: 3743, kogi: 3508, kwara: 2887,
  lagos: 13325, nasarawa: 3256, niger: 4950, ogun: 5042,
  ondo: 3933, osun: 3763, oyo: 6390, plateau: 4989,
  rivers: 6866, sokoto: 3991, taraba: 3597, yobe: 2823,
  zamfara: 3529,
};

export const STATE_NAMES: Record<string, string> = {
  abia: "Abia", adamawa: "Adamawa", akwaibom: "Akwa Ibom",
  anambra: "Anambra", bauchi: "Bauchi", bayelsa: "Bayelsa",
  benue: "Benue", borno: "Borno", crossriver: "Cross River",
  delta: "Delta", ebonyi: "Ebonyi", edo: "Edo", ekiti: "Ekiti",
  enugu: "Enugu", fct: "FCT", gombe: "Gombe", imo: "Imo",
  jigawa: "Jigawa", kaduna: "Kaduna", kano: "Kano",
  katsina: "Katsina", kebbi: "Kebbi", kogi: "Kogi",
  kwara: "Kwara", lagos: "Lagos", nasarawa: "Nasarawa",
  niger: "Niger", ogun: "Ogun", ondo: "Ondo", osun: "Osun",
  oyo: "Oyo", plateau: "Plateau", rivers: "Rivers",
  sokoto: "Sokoto", taraba: "Taraba", yobe: "Yobe",
  zamfara: "Zamfara",
};

export const NATIONAL_POLLING_UNITS = Object.values(POLLING_UNITS)
  .reduce((total, units) => total + units, 0);
export const NATIONAL_REPORTERS_REQUIRED = NATIONAL_POLLING_UNITS * REPORTERS_PER_UNIT;

export const formatCount = (count: number) => count.toLocaleString("en-NG");