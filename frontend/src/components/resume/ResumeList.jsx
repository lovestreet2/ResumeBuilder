export default function ResumeList({ resumeItems }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">
        Professional Experience
      </h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute h-full w-0.5 bg-gray-200 left-[136px] top-4"></div>

        <div className="space-y-12">
          {resumeItems.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row group transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
            >
              {/* Date container */}
              <div className="md:w-32 mb-4 md:mb-0">
                <div className="hidden md:block absolute w-3 h-3 bg-blue-500 rounded-full left-[130px] transform -translate-x-1/2 mt-2"></div>
                <p className="text-sm text-gray-500 md:text-right">
                  {item.date}
                </p>
              </div>

              {/* Content container */}
              <div className="md:ml-12 flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-medium mt-1">
                  {item.subtitle}
                </p>
                {item.description && (
                  <p className="mt-4 text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Skills tags */}
                {item.skills && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
