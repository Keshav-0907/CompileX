import { FileJson, FileCode } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CodeCard = () => {
  const files = [
    { name: 'index.html', icon: FileJson, color: 'text-orange-500' },
    { name: 'styles.css', icon: FileCode, color: 'text-blue-500' },
    { name: 'script.js', icon: FileJson, color: 'text-yellow-500' },
  ];

  return (
    <Card className="w-64 bg-blue-50 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Project Files</h3>
        <ul className="space-y-3">
          {files.map((file, index) => (
            <li key={index} className="flex items-center space-x-3">
              <file.icon className={`w-5 h-5 ${file.color}`} />
              <span className="text-blue-700">{file.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CodeCard;