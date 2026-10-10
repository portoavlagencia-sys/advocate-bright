import homeFull from "@/assets/hero-home.webp";
import home768 from "@/assets/hero-home-768.webp";
import home1280 from "@/assets/hero-home-1280.webp";

import trabalhistaFull from "@/assets/hero-trabalhista.webp";
import trabalhista768 from "@/assets/hero-trabalhista-768.webp";
import trabalhista1280 from "@/assets/hero-trabalhista-1280.webp";

import imoveisFull from "@/assets/hero-imoveis.webp";
import imoveis768 from "@/assets/hero-imoveis-768.webp";
import imoveis1280 from "@/assets/hero-imoveis-1280.webp";

import sucessorioFull from "@/assets/hero-sucessorio.webp";
import sucessorio768 from "@/assets/hero-sucessorio-768.webp";
import sucessorio1280 from "@/assets/hero-sucessorio-1280.webp";

import familiaFull from "@/assets/hero-familia.webp";
import familia768 from "@/assets/hero-familia-768.webp";
import familia1280 from "@/assets/hero-familia-1280.webp";

import escritorioFull from "@/assets/hero-escritorio-em.webp";
import escritorio768 from "@/assets/hero-escritorio-em-768.webp";
import escritorio1280 from "@/assets/hero-escritorio-em-1280.webp";

export type HeroImageData = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
};

/** Heroes ocupam a largura total da tela. */
export const HERO_SIZES = "100vw";

function build(
  src: string,
  w768: string,
  w1280: string,
  fullWidth: number,
  width: number,
  height: number,
  alt: string,
): HeroImageData {
  return {
    src,
    srcSet: `${w768} 768w, ${w1280} 1280w, ${src} ${fullWidth}w`,
    width,
    height,
    alt,
  };
}

export const heroHome = build(
  homeFull,
  home768,
  home1280,
  1600,
  1600,
  1200,
  "Sala de reuniões do escritório ao entardecer",
);

export const heroTrabalhista = build(
  trabalhistaFull,
  trabalhista768,
  trabalhista1280,
  1400,
  1400,
  788,
  "Carteira de trabalho sobre a mesa do escritório",
);

export const heroImoveis = build(
  imoveisFull,
  imoveis768,
  imoveis1280,
  1400,
  1400,
  788,
  "Chaves de imóvel sobre pasta do escritório",
);

export const heroSucessorio = build(
  sucessorioFull,
  sucessorio768,
  sucessorio1280,
  1400,
  1400,
  788,
  "Plano de partilha sobre a mesa do escritório",
);

export const heroFamilia = build(
  familiaFull,
  familia768,
  familia1280,
  1400,
  1400,
  788,
  "Família de mãos dadas ao entardecer",
);

export const heroEscritorio = build(
  escritorioFull,
  escritorio768,
  escritorio1280,
  1400,
  1400,
  788,
  "Recepção do escritório Edmom Moraes Advocacia",
);

export const areaHeroes: Record<string, HeroImageData> = {
  "direito-trabalhista": heroTrabalhista,
  "regularizacao-de-imoveis": heroImoveis,
  "direito-sucessorio": heroSucessorio,
  "direito-de-familia": heroFamilia,
};
