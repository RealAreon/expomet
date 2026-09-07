import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex min-w-0 items-center", className)}
      aria-label="EXPOMET PLUS"
    >
      <span
        className={cn(
          "relative block shrink-0",
          compact
            ? "h-8 w-[146px] sm:h-9 sm:w-[164px]"
            : "h-10 w-[184px] sm:h-11 sm:w-[202px] lg:h-[46px] lg:w-[211px]",
        )}
      >
        <Image
          src="/logo-plus.png"
          alt=""
          fill
          sizes="211px"
          className="object-contain object-left"
          priority
        />
      </span>
    </Link>
  );
}
