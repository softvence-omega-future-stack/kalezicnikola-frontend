
export default function LequidButton() {
  return (
    <div className="switcher">
      {/* Light */}
      <label className="switcher__option">
        <input
          className="switcher__input"
          type="radio"
          name="theme"
          value="light"
        />
        <svg
          className="switcher__icon"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.00006 11.4285C9.89242 11.4285 11.4286 9.89234 
              11.4286 6.99998C11.4286 4.10762 9.89242 2.57141 
              8.00006 2.57141C6.1077 2.57141 4.57149 4.10762 
              4.57149 6.99998C4.57149 9.89234 6.1077 11.4285 
              8.00006 11.4285Z"
            stroke="var(--c)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>

      {/* Dark */}
      <label className="switcher__option">
        <input
          className="switcher__input"
          type="radio"
          name="theme"
          value="dark"
        />
        <svg
          className="switcher__icon"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3001 6.69994C10.3001 8.29815 
              8.9983 9.59994 7.4001 9.59994C5.8019 9.59994 
              4.5001 8.29815 4.5001 6.69994C4.5001 5.10174 
              5.8019 3.79994 7.4001 3.79994C8.9983 3.79994 
              10.3001 5.10174 10.3001 6.69994Z"
            stroke="var(--c)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>

      {/* Dim */}
      <label className="switcher__option">
        <input
          className="switcher__input"
          type="radio"
          name="theme"
          value="dim"
        />
        <svg
          className="switcher__icon"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2858 7.99998C12.2858 10.3677 
              10.3678 12.2857 8.00003 12.2857C5.63228 12.2857 
              3.71432 10.3677 3.71432 7.99998C3.71432 5.63223 
              5.63228 3.71426 8.00003 3.71426C10.3678 3.71426 
              12.2858 5.63223 12.2858 7.99998Z"
            stroke="var(--c)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
    </div>
  );
}
