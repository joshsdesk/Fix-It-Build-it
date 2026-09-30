import React from "react";
import styles from "./PendingApprovalStamp.module.css";

interface PendingApprovalStampProps {
  text?: string;
  className?: string;
  variant?: "pending" | "draft" | "approved";
}

const defaultText: Record<NonNullable<PendingApprovalStampProps["variant"]>, string> = {
  pending: "PENDING APPROVAL",
  draft: "DRAFT",
  approved: "APPROVED",
};

export function PendingApprovalStamp({
  text,
  className,
  variant = "pending",
}: PendingApprovalStampProps) {
  const label = text || defaultText[variant];
  const classes = [styles.stampWrapper, className].filter(Boolean).join(" ");

  return (
    <span className={classes} role="status" aria-label={label}>
      <span className={[styles.stamp, styles[`is${variant[0].toUpperCase()}${variant.slice(1)}`]].join(" ")}>
        {label}
      </span>
    </span>
  );
}

export type { PendingApprovalStampProps };