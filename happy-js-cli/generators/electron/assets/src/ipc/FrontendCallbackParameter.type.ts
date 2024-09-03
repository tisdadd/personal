// must use any to match the expected callback parameter type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FrontendCallbackParameterType = (event: Event, ...args: any[])=>void;

export default FrontendCallbackParameterType;
