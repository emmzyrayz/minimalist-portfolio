import Link from "next/link";
import './project.css';


export default function ProjectInfo() {

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-[3%]">
        <div className="heading text-3xl font-extrabold mb-4 p-4">
          <h3>
            <span>DevParts:</span> The Future of Web/Mobile Development
          </h3>
        </div>
        <div className="body flex flex-col items-start justify-center gap-3 w-full h-full">
          <div className="phase-1 flex flex-col items-center justify-center w-full gap-2">
            <h2 className="title">What is DevParts?</h2>
            <div className="text">
              WebParts is a revolutionary platform that makes building websites
              easier and faster than ever before. Think of it as a massive
              library of ready-to-use website/mobile application parts ranging
              from beautiful buttons to complete shopping carts that you can mix
              and match to create your perfect website.
            </div>
          </div>
          <div className="phase-2 flex flex-col items-center justify-center w-full gap-4">
            <div className="title">Why DevParts?</div>
            <div className="text">
              <ol className="flex flex-col relative gap-2">
                <li className="flex flex-col">
                  <span className="font-semibold mr-2 text-[18px]">
                    Save Time:
                  </span>
                  <span className="ml-6">
                    Instead of building everything from scratch, use pre-made
                    components that just work
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold mr-2 text-[18px]">
                    Choose Your Style:
                  </span>
                  <span className="ml-6">
                    Pick from thousands of designs and features
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold mr-2 text-[18px]">
                    Any Language:
                  </span>
                  <span className="ml-6">
                    Use your preferred programming language or framework
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold mr-2 text-[18px]">
                    Free & Premium Options:
                  </span>
                  <span className="ml-6">
                    Get started for free or access premium features
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold mr-2 text-[18px]">
                    Community-Driven:
                  </span>
                  <span className="ml-6">
                    Join a global community of developers sharing and earning
                  </span>
                </li>
              </ol>
            </div>
          </div>
          <div className="phase-3 flex flex-col items-center justify-center w-full gap-2">
            <div className="title">How it works</div>
            <div className="text">
              <ol>
                <li>1. Browse our library of components</li>
                <li>2. Pick the parts you need</li>
                <li>3. Customize them to match your project</li>
                <li>4. Connect everything together</li>
                <li>5. Launch your website faster than ever</li>
              </ol>
            </div>
          </div>
          <div className="phase-4 flex flex-col items-center justify-center w-full gap-2">
            <div className="title">Join Us</div>
            <div className="text flex flex-col gap-4">
              <span>
                We&lsquo;re building the future of web development and
                we&lsquo;d love your help! Whether you&lsquo;re a designer,
                developer, or just passionate about making the web better,
                there&lsquo;s a place for you in our community.
              </span>
              <div className="w-full h-full flex items-center justify-center">
                <Link
                  href="/projectform"
                  className="btn flex items-center justify-center w-[120px] h-[50px] rounded-lg border border-black bg-[black] text-[--white] hover:bg-[--white] hover:text-[--black] text-lg font-semibold"
                >
                  <span>Join Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}