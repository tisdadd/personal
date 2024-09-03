const env = typeof window !== 'undefined' ? { ...process.env, ...window.env } : { ...process.env };

export default env;
