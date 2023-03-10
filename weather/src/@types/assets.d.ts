declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: import('react-native').ImageSourcePropType;
  export default content;
}

declare module '*.gif' {
  const content: import('react-native').ImageSourcePropType;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
