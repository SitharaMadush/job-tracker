import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const isLoggedIn = !!auth.user;

    return (
        <>
            <Head title="Job Application Tracker" />
            <div className="bg-white text-slate-800">
                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        {/* 🔹 TOP BAR (KEPT AS IS, JUST LIGHT COLORS) */}
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                {/* <svg
                                    className="h-12 w-auto text-red-600 lg:h-16"
                                    viewBox="0 0 62 65"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z"
                                        fill="currentColor"
                                    />
                                </svg> */}
                                <svg
                                    className="w-16 h-16 text-red-600 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" />
                                </svg>
                            </div>

                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route("job-applications.index")}
                                        className="rounded-md px-3 py-2 text-sm text-slate-700 ring-1 ring-transparent transition hover:text-slate-900 focus:outline-none focus-visible:ring-red-500"
                                    >
                                        Applications
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-sm text-slate-700 ring-1 ring-transparent transition hover:text-slate-900 focus:outline-none focus-visible:ring-red-500"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 text-sm text-slate-700 ring-1 ring-transparent transition hover:text-slate-900 focus:outline-none focus-visible:ring-red-500"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        {/* 🔹 SIMPLE MAIN CONTENT (NO LIVE DASHBOARD) */}
                        <main className="mt-4 pb-12">
                            {/* Hero – single column on mobile, simple 2-col on desktop */}
                            <section className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                                {/* Left: text & buttons */}
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                        JobTrack · Job Application Tracker
                                    </div>

                                    <div>
                                        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                            A simple way to keep every job
                                            application organised.
                                        </h1>
                                        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                                            JobTrack helps you log applications,
                                            attach job descriptions, track
                                            statuses and follow-ups, and keep
                                            interview notes – all in one clean
                                            interface. Admins manage users
                                            securely with roles & permissions.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3">
                                        {isLoggedIn ? (
                                            <Link
                                                href={route(
                                                    "job-applications.index"
                                                )}
                                                className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-500"
                                            >
                                                Open my applications
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route("register")}
                                                    className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-500"
                                                >
                                                    Create free account
                                                </Link>
                                                <Link
                                                    href={route("login")}
                                                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-slate-400"
                                                >
                                                    I already have an account
                                                </Link>
                                            </>
                                        )}
                                    </div>

                                    <div className="grid gap-4 text-xs text-slate-600 sm:grid-cols-3">
                                        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                                Log
                                            </p>
                                            <p className="mt-1 text-lg font-semibold text-slate-900">
                                                Every application
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                Company, role, status, dates and
                                                notes in one place.
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                                Attach
                                            </p>
                                            <p className="mt-1 text-lg font-semibold text-slate-900">
                                                JD images & PDFs
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                Upload and preview job
                                                descriptions per application.
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                                Secure
                                            </p>
                                            <p className="mt-1 text-lg font-semibold text-slate-900">
                                                Roles & permissions
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                Admins manage users; candidates
                                                only see their own data.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: very simple info card column */}
                                <div className="space-y-4">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <h2 className="text-sm font-semibold text-slate-900">
                                            For candidates
                                        </h2>
                                        <p className="mt-2 text-xs text-slate-600">
                                            A personal job-hunting assistant:
                                            log each application once and stop
                                            losing track of where you applied or
                                            when to follow up.
                                        </p>
                                        <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                                            <li>
                                                • Track status: applied →
                                                interview → offer
                                            </li>
                                            <li>
                                                • Keep links to job posts in one
                                                place
                                            </li>
                                            <li>
                                                • Store interview notes per
                                                company
                                            </li>
                                            <li>
                                                • Attach JD screenshots & PDFs
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <h2 className="text-sm font-semibold text-slate-900">
                                            For admins / reviewers
                                        </h2>
                                        <p className="mt-2 text-xs text-slate-600">
                                            Manage users and roles with a clear
                                            separation of responsibilities,
                                            built on top of Spatie permissions.
                                        </p>
                                        <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                                            <li>• Admin & candidate roles</li>
                                            <li>• Admins can manage users</li>
                                            <li>
                                                • Candidates’ applications stay
                                                private
                                            </li>
                                            <li>
                                                • Service & repository layers
                                                for clean code
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <h2 className="text-sm font-semibold text-slate-900">
                                            Tech stack
                                        </h2>
                                        <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                                            <li>
                                                • Laravel {laravelVersion} · PHP{" "}
                                                {phpVersion}
                                            </li>
                                            <li>
                                                • Inertia + React + TypeScript
                                            </li>
                                            <li>• Tailwind CSS + shadcn/ui</li>
                                            <li>
                                                • Spatie Roles & Permissions
                                            </li>
                                            <li>
                                                • Form Requests, services &
                                                repositories
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </main>

                        {/* Footer */}
                        <footer className="pb-10 pt-4 text-center text-xs text-slate-500">
                            Laravel v{laravelVersion} (PHP v{phpVersion}) ·
                            Inertia · React · Tailwind · shadcn/ui · Spatie
                            Permissions
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
