import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import editorStore, {
  departments,
  designations,
  typeAtom,
  types,
} from '@/store/editor';
import { previewModeAtom } from '@/store/preview-mode';
import { IdCardIcon, PersonIcon, ReaderIcon } from '@radix-ui/react-icons';
import { useSetAtom } from 'jotai';
import { Combobox } from './combobox';
import { FormDescription } from './form-description';
import { FormItem } from './form-item';
import { TextInput } from './input';

const tabContentClass = cn(
  'flex-1 flex-col gap-y-4 overflow-y-auto p-4 data-[state=active]:flex',
);

const tabHeaderClass = cn(
  'mb-4 font-bold text-3xl leading-tight md:text-4xl dark:text-slate-50',
);

export function Editor() {
  const setTab = useSetAtom(editorStore.editorTab);
  const setPreviewMode = useSetAtom(previewModeAtom);
  return (
    <Tabs
      defaultValue="student"
      className="flex flex-1 flex-col overflow-hidden"
      atom={editorStore.editorTab}
    >
      <TabsList className="h-auto w-full">
        {(
          [
            ['student', PersonIcon],
            ['subject', ReaderIcon],
            ['teacher', IdCardIcon],
          ] as const
        ).map(([x, Icon]) => (
          <TabsTrigger value={x} className="flex-1" key={x} aria-label={x}>
            <Icon className="h-8 w-8" />
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="student" className={tabContentClass}>
        <h2 className={tabHeaderClass}>Student</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormItem label="Student ID">
            <TextInput atom={editorStore.studentID} />
          </FormItem>
          <FormItem label="Section">
            <TextInput atom={editorStore.studentSection} />
            <FormDescription>leave empty if not applicable</FormDescription>
          </FormItem>
        </div>
        <FormItem label="Full Name">
          <TextInput atom={editorStore.studentName} />
        </FormItem>
        <FormItem label="Department">
          <Combobox
            name="department"
            atom={editorStore.studentDepartment}
            options={departments.map((x) => ({ label: x, value: x }))}
          />
        </FormItem>
        <Button
          variant="outline"
          className="mt-auto"
          onClick={() => setTab('subject')}
        >
          Next
        </Button>
      </TabsContent>
      <TabsContent value="subject" className={tabContentClass}>
        <h2 className={tabHeaderClass}>Subject</h2>
        <div className="grid gap-4 sm:grid-cols-[7rem_1fr]">
          <FormItem label="Course No.">
            <TextInput atom={editorStore.courseNo} />
          </FormItem>
          <FormItem label="Course Title">
            <TextInput atom={editorStore.courseTitle} />
          </FormItem>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormItem label="Type">
            <Combobox
              name="type"
              atom={typeAtom}
              options={types.map((x) => ({ label: x, value: x }))}
            />
          </FormItem>
          <FormItem label="No.">
            <TextInput
              atom={editorStore.coverNo}
              type="number"
              step={1}
              min={1}
            />
          </FormItem>
        </div>
        <FormItem label="Title">
          <TextInput atom={editorStore.coverTitle} />
        </FormItem>
        <FormItem label="Date of submission">
          <TextInput atom={editorStore.dateOfSubmission} />
        </FormItem>
        <Button
          variant="outline"
          className="mt-auto"
          onClick={() => setTab('teacher')}
        >
          Next
        </Button>
      </TabsContent>
      <TabsContent value="teacher" className={tabContentClass}>
        <h2 className={tabHeaderClass}>Teacher</h2>
        <FormItem label="Teacher Name">
          <TextInput atom={editorStore.teacherName} />
        </FormItem>
        <FormItem label="Designation">
          <Combobox
            name="designation"
            atom={editorStore.teacherDesignation}
            options={designations.map((x) => ({ label: x, value: x }))}
          />
        </FormItem>
        <FormItem label="Department">
          <Combobox
            name="department"
            atom={editorStore.teacherDepartment}
            options={departments.map((x) => ({ label: x, value: x }))}
          />
        </FormItem>
        <FormItem label="Second Teacher Name">
          <TextInput atom={editorStore.secondTeacherName} />
        </FormItem>
        <FormItem label="Second Teacher Designation">
          <Combobox
            name="designation"
            atom={editorStore.secondTeacherDesignation}
            options={designations.map((x) => ({ label: x, value: x }))}
          />
        </FormItem>
        <Button
          variant="outline"
          className="mt-auto lt-lg:hidden"
          onClick={() => setTab('subject')}
        >
          Back
        </Button>
        <Button
          variant="outline"
          className="mt-auto lg:hidden"
          onClick={() => setPreviewMode(true)}
        >
          Let's go
        </Button>
      </TabsContent>
    </Tabs>
  );
}
