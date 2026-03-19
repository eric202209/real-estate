import Image from 'next/image';
import { Property } from '@/types/property';

interface AgentContactProps {
  agent: Property['agent'];
}

export default function AgentContact({ agent }: AgentContactProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Image
          src={agent.image || '/api/placeholder/150/150'}
          alt={agent.name}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover"
          unoptimized
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-600">Licensed Real Estate Agent</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <a
          href={`tel:${agent.phone}`}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
        >
          📞 {agent.phone}
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
        >
          ✉️ {agent.email}
        </a>
      </div>

      <button className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Contact Agent
      </button>
    </div>
  );
}
