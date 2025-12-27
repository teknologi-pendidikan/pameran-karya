import buildInfo from "@/lib/build-info";

interface BuildInfoDisplayProps {
  className?: string;
  showVersion?: boolean;
  showBuildId?: boolean;
  showFullDate?: boolean;
  showGitCommit?: boolean;
}

export function BuildInfoDisplay({
  className = "",
  showVersion = true,
  showBuildId = true,
  showFullDate = true,
  showGitCommit = true,
}: BuildInfoDisplayProps) {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...(showFullDate && {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  };

  const renderGitInfo = () => {
    if (!showGitCommit || !buildInfo.git.commitShort) return null;

    const gitText = buildInfo.git.commitShort;

    if (buildInfo.git.gitlabUrl && buildInfo.git.commitHash) {
      return (
        <>
          {" • "}
          <a
            href={`${buildInfo.git.gitlabUrl}/-/commit/${buildInfo.git.commitHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            title={buildInfo.git.commitMessage || "View commit on GitLab"}
          >
            {gitText}
          </a>
        </>
      );
    }

    return ` • ${gitText}`;
  };

  return (
    <span className={`text-xs text-muted-foreground ${className}`}>
      Dibangun pada {formatDate(buildInfo.timestamp)}
      {showVersion && ` • v${buildInfo.version}`}
      {showBuildId && ` • ${buildInfo.buildId.substring(0, 7)}`}
      {renderGitInfo()}
    </span>
  );
}

export default BuildInfoDisplay;
