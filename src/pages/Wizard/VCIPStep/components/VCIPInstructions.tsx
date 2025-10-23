export default function VCIPInstructions() {
  return (
    <div className="py-[16px] px-[32px] mt-6">
      <h3 className="text-xl font-roboto font-semibold text-color-light mb-6">
        Welcome To the VCIP:
      </h3>

      <div className="bg-blue-100 rounded-lg p-4 mb-6 h-[364px]">
        <p className="text-color-light font-roboto mb-4 font-semibold text-[18px]">
          To proceed with the VCIP verification when the video recording begins
        </p>

        <ol className="space-y-2 text-sm font-roboto text-color-muted-light">
          <li>1. Please say out your full name clearly as per your National ID/Passport</li>
          <li>2. Please say out your Birth Date</li>
          <li>3. Please show your National ID/Passport clearly</li>
          <li>4. Ensure good lighting and a quiet environment</li>
          <li>5. Keep the camera steady and maintain eye contact</li>
          <li>6. Do not pause or stop during recording</li>
          <li>7. Do not use filters or virtual backgrounds</li>
        </ol>
         <p className="text-cyan-600 text-sm font-medium mt-7 mb-4">
        Please click on the [Start Recording] button when you are ready.
      </p>
      </div>

     
    </div>
  );
}
