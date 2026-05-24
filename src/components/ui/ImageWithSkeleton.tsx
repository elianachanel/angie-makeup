"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

type Props = ImageProps & {
  skeletonClassName?: string;
};

export function ImageWithSkeleton({
  skeletonClassName = "",
  className = "",
  onLoad,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded ? (
        <Skeleton className={`absolute inset-0 z-[1] rounded-none ${skeletonClassName}`} />
      ) : null}
      <Image
        {...props}
        className={`${className} transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </>
  );
}
