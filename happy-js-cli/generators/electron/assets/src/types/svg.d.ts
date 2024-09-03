declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement & HTMLImageElement>>;
  export default content;
}
