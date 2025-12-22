// Call review tracker using localStorage
const REVIEWED_CALLS_KEY = 'reviewed_calls';

export const callReviewTracker = {
  // Get all reviewed call IDs
  getReviewedCalls: (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const reviewed = localStorage.getItem(REVIEWED_CALLS_KEY);
      return reviewed ? JSON.parse(reviewed) : [];
    } catch (error) {
      console.error('Error reading reviewed calls:', error);
      return [];
    }
  },

  // Mark a call as reviewed
  markAsReviewed: (callId: string): void => {
    try {
      const reviewed = callReviewTracker.getReviewedCalls();
      if (!reviewed.includes(callId)) {
        reviewed.push(callId);
        localStorage.setItem(REVIEWED_CALLS_KEY, JSON.stringify(reviewed));
        
        // Dispatch event to update count everywhere
        window.dispatchEvent(new Event('callReviewed'));
      }
    } catch (error) {
      console.error('Error marking call as reviewed:', error);
    }
  },

  // Check if a call is reviewed
  isReviewed: (callId: string): boolean => {
    return callReviewTracker.getReviewedCalls().includes(callId);
  },

  // Get count of unreviewed calls from total calls
  getUnreviewedCount: (allCalls: any[]): number => {
    const reviewedCalls = callReviewTracker.getReviewedCalls();
    return allCalls.filter(call => !reviewedCalls.includes(call.id)).length;
  },

  // Clear all reviewed calls (for testing)
  clearReviewedCalls: (): void => {
    localStorage.removeItem(REVIEWED_CALLS_KEY);
    window.dispatchEvent(new Event('callReviewed'));
  }
};