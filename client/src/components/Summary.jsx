  <div>
    <h2>
      {done} of {pool.length}{' '}
      {req.length ? 'required ' : ''}
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
        <span>{job.title || 'Job details unavailable'}</span>
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
      <span className="pill ok">{done} demonstrated</span>

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

