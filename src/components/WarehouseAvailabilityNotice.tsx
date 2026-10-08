type WarehouseAvailabilityNoticeProps = {
  /** Plural category label, e.g. "dishwashers". Omit for a general appliance message. */
  categoryLabel?: string;
  /** Opens the appliance request form, if the page has one. */
  onRequest?: () => void;
};

/**
 * Tells customers that items not listed online may still be available from
 * Bettar's warehouse, and points them to a rep by phone.
 */
export default function WarehouseAvailabilityNotice({
  categoryLabel,
  onRequest,
}: WarehouseAvailabilityNoticeProps) {
  const subject = categoryLabel ?? "appliance";

  return (
    <section
      aria-labelledby="warehouse-availability-heading"
      className="bg-[#F4F7FF] rounded-xl p-6 md:p-8 text-center"
    >
      <h2
        id="warehouse-availability-heading"
        className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
      >
        Can&apos;t find the {subject} you&apos;re looking for?
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Not everything we carry is listed online. We may have it in our warehouse,
        and we can often bring in models that aren&apos;t in our showroom inventory.
        Call us and talk to a rep about what you need.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="tel:301-949-2500"
          className="px-6 py-3 rounded-lg bg-[#D32F2F] text-white font-semibold hover:bg-[#B71C1C] transition-colors shadow-md hover:shadow-lg"
        >
          Call 301-949-2500
        </a>
        {onRequest && (
          <button
            type="button"
            onClick={onRequest}
            className="px-6 py-3 rounded-lg bg-[#002D72] text-white font-semibold hover:bg-[#001F5C] transition-colors shadow-md hover:shadow-lg"
          >
            Request an appliance
          </button>
        )}
      </div>
    </section>
  );
}
