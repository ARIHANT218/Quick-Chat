import { Users } from "lucide-react";


const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-100 border-end d-flex flex-column">
      {/* Header */}
      <div className="border-bottom w-100 p-3">
        <div className="d-flex align-items-center gap-2">
          <Users size={24} />
          <span className="fw-medium d-none d-lg-block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-auto w-100 py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-100 p-3 d-flex align-items-center gap-3">
            {/* Avatar skeleton */}
            <div className="position-relative mx-auto mx-lg-0">
              <div
                className="rounded-circle bg-secondary bg-opacity-25"
                style={{
                  width: "48px",
                  height: "48px",
                  animation: "pulse 1.5s infinite",
                }}
              />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="d-none d-lg-block text-start flex-grow-1">
              <div
                className="bg-secondary bg-opacity-25 mb-2 rounded"
                style={{
                  width: "128px",
                  height: "16px",
                  animation: "pulse 1.5s infinite",
                }}
              />
              <div
                className="bg-secondary bg-opacity-25 rounded"
                style={{
                  width: "64px",
                  height: "12px",
                  animation: "pulse 1.5s infinite",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton ;
