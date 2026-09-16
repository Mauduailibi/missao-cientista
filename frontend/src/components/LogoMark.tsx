import logo from '../assets/logo-missao-cientista.webp'

type LogoMarkProps = {
  className: string
  alt?: string
}

export function LogoMark({ className, alt = 'Logo Missão Cientista' }: LogoMarkProps) {
  return (
    <span className={`relative block aspect-square shrink-0 overflow-hidden rounded-full ${className}`}>
      <img
        src={logo}
        alt={alt}
        className="absolute inset-0 size-full object-cover object-center"
      />
    </span>
  )
}
