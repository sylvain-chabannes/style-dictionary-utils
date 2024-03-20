import StyleDictionary from 'style-dictionary'
import { isShadow } from '../filter/isShadow'

type TokenShadow = {
  color: string
  offsetX: string
  offsetY: string
  blur: string
  spread: string
}

const formatShadow = ({
  offsetX = '0',
  offsetY = '0',
  blur = '0',
  spread = '0',
  color,
}: TokenShadow ): string => `${offsetX} ${offsetY} ${blur} ${spread} ${color}`;

export const shadowCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isShadow,
  transformer: ({ value }: { value: string | TokenShadow }) => {
    if (Array.isArray(value)) {
      return value.map(formatShadow).join(', ');
    }

    if (typeof value === 'string') {
      return value;
    }

    return formatShadow(value);
  },
}
