type LogoSize = 'sm' | 'lg';

type Props = {
  size?: LogoSize;
};

type LogoConfig = { width: number; height: number; url: string };

const LOGO_SIZES: Record<LogoSize, LogoConfig> = {
  sm: { width: 89, height: 32, url: './logo/logo-small.png' },
  lg: { width: 80, height: 28, url: './logo/logo.png' },
};

export const Logo = ({ size = 'lg' }: Props) => (
  <img
    className="logo"
    src={LOGO_SIZES[size].url}
    width={LOGO_SIZES[size].width}
    height={LOGO_SIZES[size].height}
    alt="Nice Gadgets"
  />
);
