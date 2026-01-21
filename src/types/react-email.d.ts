declare module '@react-email/components' {
  import * as React from 'react';
  
  export interface HtmlProps extends React.HTMLAttributes<HTMLHtmlElement> {
    lang?: string;
    dir?: string;
  }
  
  export interface BodyProps extends React.HTMLAttributes<HTMLBodyElement> {
    style?: React.CSSProperties;
  }
  
  export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    style?: React.CSSProperties;
  }
  
  export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    style?: React.CSSProperties;
  }
  
  export interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    style?: React.CSSProperties;
  }
  
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    style?: React.CSSProperties;
  }
  
  export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
  }
  
  export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    style?: React.CSSProperties;
  }
  
  export interface HeadProps extends React.HTMLAttributes<HTMLHeadElement> {}
  
  export interface TailwindProps {
    children: React.ReactNode;
  }
  
  export const Html: React.FC<HtmlProps>;
  export const Body: React.FC<BodyProps>;
  export const Container: React.FC<ContainerProps>;
  export const Text: React.FC<TextProps>;
  export const Button: React.FC<ButtonProps>;
  export const Link: React.FC<LinkProps>;
  export const Img: React.FC<ImgProps>;
  export const Section: React.FC<SectionProps>;
  export const Head: React.FC<HeadProps>;
  export const Tailwind: React.FC<TailwindProps>;
}