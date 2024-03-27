import { Temperature } from "apps/weather/loaders/temperature.ts";

export interface Props {
  temperature?: Temperature | null;
}

function Weather({ temperature }: Props) {
  return (
    <h1 class="flex justify-center">
      No brasil a temperatura está em {temperature?.celsius} °C
    </h1>
  );
}

export default Weather;
