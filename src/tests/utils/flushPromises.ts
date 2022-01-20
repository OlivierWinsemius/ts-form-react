const resolvePromise = () => new Promise((resolve) => setTimeout(resolve, 0));

export const flushPromises = async () => {
  await resolvePromise();
  return resolvePromise();
};
