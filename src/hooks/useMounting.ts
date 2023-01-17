import {useEffect} from 'react';

export const useMounting = (onMounting: VoidFunction, onUnmounting?: VoidFunction): void => {
  useEffect(() => {
    onMounting();

    return (): void => {
      onUnmounting && onUnmounting();
    };
    /**
     * The rule is disabled because our effect only run one time when component did mount
     * Read the `Note` section from the following link for more information.
     * https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
     */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
