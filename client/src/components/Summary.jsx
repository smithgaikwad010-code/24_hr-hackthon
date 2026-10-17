
export default function Summary({
  assessments = [],
  job = {},
  repos = [],
  username = '',
}) {
  const safeAssessments = Array.isArray(assessments)
    ? assessments
    : [];

  const safeRepos = Array.isArray(repos) ? repos : [];

  const requiredSkills = safeAssessments.filter(
    (a) => a && a.importance === 'required'
  );

  const pool = requiredSkills.length
    ? requiredSkills
    : safeAssessments;

  const done = pool.filter(
    (a) => a && a.status === 'demonstrated'
  ).length;

  const pct = pool.length
    ? Math.round((done / pool.length) * 100)
    : 0;

  const old = pool.filter(
    (a) =>
      a &&
      a.status === 'demonstrated' &&
      (a.recency === 'old' || a.recency === 'dated')
  ).length;

  const sourceUrl =
    typeof job.sourceUrl === 'string' &&
    /^https?:\/\//i.test(job.sourceUrl)
      ? job.sourceUrl
      : null;

  return (
    <div className="panel summary">
      <div
        className="ring"
        style={{ '--p': `${pct}%` }}
        role="img"
        aria-label={`${pct}% of skills demonstrated`}
      >
        <b>{pct}%</b>
      </div>

      <div>
        <h2>
          {done} of {pool.length}{' '}
          {requiredSkills.length ? 'required ' : ''}
          skills demonstrated
          {old > 0 && `, ${old} only from older evidence`}
        </h2>

        <p>
          Job:{' '}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {job.title || 'Job details'}
            </a>
          ) : (
            <span>
              {job.title || 'Job details unavailable'}
            </span>
          )}

          {job.company && (
            <span className="muted"> ({job.company})</span>
          )}
        </p>

        <p className="muted small">
          Scope: {safeRepos.length} public non-fork repositories of{' '}
          {username ? (
            <a
              href={`https://github.com/${encodeURIComponent(username)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {username}
            </a>
          ) : (
            'GitHub user unavailable'
          )}

          {job.extractedBy === 'rules' &&
            ' · skills extracted with a keyword fallback'}
        </p>

        <div className="pills">
          <span className="pill ok">
            {done} demonstrated
          </span>

          <span className="pill gap">
            {pool.length - done} not demonstrated in this scope
          </span>

          {old > 0 && (
            <span className="pill gap">
              {old} only from older evidence
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
