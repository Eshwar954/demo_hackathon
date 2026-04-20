export const Card = ({ title, value, icon, trend, isPositive }) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/50 shadow-sm shadow-primary/5 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-fixed/20 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 font-label text-xs font-bold px-2 py-1 rounded-md ${isPositive ? 'bg-success-container/30 text-success' : 'bg-error-container/30 text-error'}`}>
            <span className="material-symbols-outlined text-[14px]">
              {isPositive ? 'trending_up' : 'trending_down'}
            </span>
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">{title}</p>
        <p className="font-headline text-3xl font-extrabold text-on-surface">{value}</p>
      </div>
    </div>
  );
};

export const StatusBadge = ({ status }) => {
  const getStyles = () => {
    switch(status.toUpperCase()) {
      case 'APPROVED':
      case 'VERIFIED':
      case 'COMPLETED':
      case 'SOLD':
      case 'SUCCESS':
      case 'ISSUED':
      case 'ACTIVE':
        return 'bg-success-container/30 text-success border border-success/20';
      case 'PENDING':
      case 'UNDER_VERIFICATION':
      case 'PENDING_MINT':
        return 'bg-warning-container/30 text-on-warning-container border border-warning/20';
      case 'REJECTED':
      case 'FAILED':
      case 'CLOSED':
      case 'CANCELLED':
        return 'bg-error-container/30 text-error border border-error/20';
      case 'CREATED':
        return 'bg-surface-container-high text-on-surface border border-outline-variant';
      default:
        return 'bg-surface-variant text-on-surface-variant border border-outline-variant';
    }
  };

  return (
    <span className={`font-label text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${getStyles()}`}>
      {status}
    </span>
  );
};
