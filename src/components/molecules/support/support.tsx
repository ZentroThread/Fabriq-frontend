function Support() {
  return (
    <div className="w-60 h-40 p-5 bg-support-bg ml-5 rounded-2xl mt-auto mb-2">
      <span className="text-[18px]  text-style font-semibold mb-2">
        Need Help?
      </span>
      <br />

      <span className="text-[14px] text-support-text">
        Contact our support team for assistance
      </span>
      <br />

      <button
        className="w-full text-[14px] shadow-xl font-semibold h-9 bg-support-button 
hover:bg-support-button-hover text-support-button-text rounded-2xl mt-3"
      >
        {" "}
        Get Support
      </button>
    </div>
  );
}

export default Support;
