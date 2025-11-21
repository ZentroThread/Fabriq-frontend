function Support() {
  return (
    <div className="w-60 h-40 p-5 bg-[#FBDDE3] ml-5 rounded-2xl mt-auto mb-5  ">
      <span
        style={{ fontFamily: "Times New Roman, serif" }}
        className="text-[18px] text-[#615758] mb-2  "
      >
        Need Help?
      </span>
      <br />

      <span className="text-[14px] text-[#AA9D9D] ">
        Contact our support team for assistance
      </span>
      <br />

      <button
        className="w-full text-[14px] shadow-xl font-semibold h-9 bg-[#b77e66] 
hover:bg-[#AB7057] text-white rounded-2xl mt-3"
      >
        {" "}
        Get Support
      </button>
    </div>
  );
}

export default Support;
