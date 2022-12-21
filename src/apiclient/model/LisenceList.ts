export type LisenceListParams = {};

export type LisenceListResult = {
  status: string;
  maintainer: string;
  od_conformance: string;
  family: string;
  osd_conformance: string;
  domain_data: string;
  title: string;
  url: string;
  is_generic: string;
  is_okd_compliant: boolean;
  is_osi_compliant: boolean;
  domain_content: string;
  domain_software: string;
  id: string;
}[];
