"use client";

import { Button, Result } from "antd";

type ErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <Result
      status="500"
      title="Something went wrong"
      subTitle={error.message || "Please try again later."}
      extra={
        <Button
          type="primary"
          onClick={reset}
        >
          Try Again
        </Button>
      }
    />
  );
}