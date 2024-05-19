import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  utmType:
    | "utm_source"
    | "utm_medium"
    | "utm_campaign"
    | "utm_term"
    | "utm_content";
  utmContent: string;
}

const MatchUtm = (
  { utmType, utmContent }: Props,
  { request }: MatchContext,
) => {
  const url = new URL(request.url);

  const param = url.searchParams.get(utmType);

  return utmContent === param;
};

export default MatchUtm;
