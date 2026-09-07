import type { CalcInput, PipeProf } from "@/lib/calc-types";

const PI = 3.14013;

function finite(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function calcSquare(input: CalcInput): number {
  return finite((input.a * input.b * input.n) / 1e6);
}

export function calcWeight(
  key: string,
  input: CalcInput,
  pipeProf: PipeProf[],
): number {
  switch (key) {
    case "pipeCircle":
      return finite(
        input.metallId === 1
          ? 0.02466 * input.t * (input.d - input.t) * input.l
          : ((input.d - input.t) * input.t * input.l * input.p * 0.00314013) /
              1.006787,
      );
    case "list":
      return finite((input.a * input.b * input.t * input.p * input.n) / 1e6);
    case "circle":
      return finite(
        (PI * input.d * input.d * input.l * input.p) / 4000 / 1.006832,
      );
    case "pipeProf": {
      const row = pipeProf.find(
        (item) =>
          item.a === input.a && item.b === input.b && item.t === input.t,
      );
      if (row) return finite(row.m * input.l);
      return finite(
        ((2 * (input.a + input.b - 2 * input.t) * input.t * input.p * input.l) /
          1000) *
          0.98,
      );
    }
    case "corner":
      return finite(
        ((input.a + input.b - input.t) * input.t * input.p * input.l) / 1000,
      );
    case "channel":
    case "balk":
      return finite(input.m * input.l);
    case "armature":
      return finite((PI * input.d * input.d * input.l * 7.85) / 4000);
    case "square":
      return finite(
        (input.a * input.a * input.l * input.p) / 1000 / 1.0063694,
      );
    case "hexahedron":
      return finite((0.8663 * input.a * input.a * input.l * input.p) / 1000);
    case "branch":
    case "flange":
      return finite(input.m * input.n);
    case "ribbon":
      return finite((input.a * input.b * input.t * input.p) / 1000);
    default:
      return 0;
  }
}

export function calcLength(
  key: string,
  input: CalcInput,
  pipeProf: PipeProf[],
): number {
  switch (key) {
    case "pipeCircle":
      return finite(
        input.metallId === 1
          ? (input.M / ((input.d - input.t) * input.t * input.p * 0.00314013)) *
              1.006787
          : input.M / (0.02466 * input.t * (input.d - input.t)),
      );
    case "circle":
      return finite(
        ((4000 * input.M) / (PI * input.d * input.d * input.p)) * 1.006832,
      );
    case "pipeProf": {
      const row = pipeProf.find(
        (item) =>
          item.a === input.a && item.b === input.b && item.t === input.t,
      );
      if (row) return finite(input.M / row.m);
      return finite(
        ((1000 * input.M) /
          (2 * (input.a + input.b - 2 * input.t) * input.t * input.p)) *
          1.02,
      );
    }
    case "corner":
      return finite(
        (1000 * input.M) / ((input.a + input.b - input.t) * input.t * input.p),
      );
    case "channel":
    case "balk":
      return finite(input.M / input.m);
    case "armature":
      return finite((4000 * input.M) / (PI * input.d * input.d * 7.85));
    case "square":
      return finite(
        ((1000 * input.M) / (input.a * input.a * input.p)) * 1.0063694,
      );
    case "hexahedron":
      return finite((1000 * input.M) / (0.8663 * input.a * input.a * input.p));
    case "ribbon":
      return finite((1000 * input.M) / (input.a * input.t * input.p));
    default:
      return 0;
  }
}

export function isValidWeight(sortId: number, input: CalcInput): boolean {
  if (sortId === 8) {
    return parseInt(String(input.d), 10) - 2 * parseInt(String(input.t), 10) > 1;
  }
  if (sortId === 9) {
    return (
      parseInt(String(input.a), 10) - 2 * parseInt(String(input.t), 10) > 1 &&
      parseInt(String(input.b), 10) - 2 * parseInt(String(input.t), 10) > 1
    );
  }
  return true;
}
