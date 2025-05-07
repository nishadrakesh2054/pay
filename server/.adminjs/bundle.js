(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  // src/admin/GameSelect.js
  const GameSelect = props => {
    const [games, setGames] = React.useState([]);
    const [selectedGame, setSelectedGame] = React.useState(null);
    React.useEffect(() => {
      fetch("/api/games").then(response => response.json()).then(data => {
        const gameOptions = data.map(game => ({
          value: game.id.toString(),
          label: `${game.name} - ${game.category}`
        }));
        setGames(gameOptions);
      }).catch(error => console.error("Error fetching games:", error));
    }, []);
    React.useEffect(() => {
      if (props.value) {
        const game = games.find(g => g.value === props.value.toString());
        setSelectedGame(game || null);
      }
    }, [props.value, games]);
    const handleChange = selectedOption => {
      setSelectedGame(selectedOption);
      if (props.onChange) {
        const value = selectedOption ? selectedOption.value : null;
        props.onChange(value);
      }
    };

    // In GameSelect component
    console.log('Selected game:', selectedGame);

    // In 'before' hooks
    console.log('Request payload:', request.payload);
    return /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      ...props,
      options: games,
      onChange: handleChange,
      value: selectedGame,
      isClearable: true,
      placeholder: "Select a game..."
    });
  };

  // import React, { useState } from "react";
  // import { Box, Button, DatePicker } from "@adminjs/design-system";
  // import { ApiClient } from "adminjs";

  const DownloadPDFButton = props => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const api = new adminjs.ApiClient();
    const handleDownload = async () => {
      try {
        const response = await api.resourceAction({
          resourceId: "registrations",
          actionName: "generatePDF",
          data: {
            startDate,
            endDate
          }
        });
        if (response.data.url) {
          window.open(response.data.url, "_blank");
        } else {
          console.error("No URL returned from the server");
        }
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.DatePicker, {
      value: startDate,
      onChange: date => setStartDate(date)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.DatePicker, {
      value: endDate,
      onChange: date => setEndDate(date)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleDownload
    }, "Generate PDF"));
  };

  const DashboardUI = () => {
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "grey",
      padding: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H1, null, "\u26BD Football League Dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Welcome to the Football League Management System."), /*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "\uD83C\uDFC6 League Name"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "\uD83D\uDCC5 Start Date"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "\uD83D\uDCCD Location"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Premier League"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "March 10, 2025"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "London")), /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Champions League"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "April 15, 2025"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Paris"))));
  };

  const GenerateCertificates = props => {
    const {
      record
    } = props;
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [pdfUrl, setPdfUrl] = React.useState(null);
    const handleGenerateCertificates = async () => {
      setIsGenerating(true);
      try {
        const response = await fetch(`/admin/api/resources/Certificate/records/${record.id}/generateCertificates`, {
          method: "POST"
        });
        const data = await response.json();
        if (data.msg) {
          alert(data.msg);
          // Use the filename returned from the server
          setPdfUrl(`/api/download-certificates/${data.pdfFilename}`);
        }
      } catch (error) {
        console.error("Error generating certificates:", error);
        alert("Failed to generate certificates");
      } finally {
        setIsGenerating(false);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H2, null, "Generate Certificates"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Click the button below to generate certificates using the uploaded Excel file."), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleGenerateCertificates,
      disabled: isGenerating
    }, isGenerating ? "Generating..." : "Generate Certificates"), pdfUrl && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Certificates generated successfully!"), /*#__PURE__*/React__default.default.createElement(designSystem.Link, {
      href: pdfUrl,
      target: "_blank"
    }, "Download Certificates (PDF)")));
  };

  const ResumeDownloadButton = ({
    record
  }) => {
    const resumeUrl = record.params.resumeUrl;
    if (!resumeUrl) return /*#__PURE__*/React__default.default.createElement("span", null, "No resume uploaded");
    return /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      as: "a",
      href: resumeUrl,
      download: true,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Download Resume");
  };

  const Edit = ({ property, record, onChange }) => {
      const { translateProperty } = adminjs.useTranslation();
      const { params } = record;
      const { custom } = property;
      const path = adminjs.flat.get(params, custom.filePathProperty);
      const key = adminjs.flat.get(params, custom.keyProperty);
      const file = adminjs.flat.get(params, custom.fileProperty);
      const [originalKey, setOriginalKey] = React.useState(key);
      const [filesToUpload, setFilesToUpload] = React.useState([]);
      React.useEffect(() => {
          // it means means that someone hit save and new file has been uploaded
          // in this case fliesToUpload should be cleared.
          // This happens when user turns off redirect after new/edit
          if ((typeof key === 'string' && key !== originalKey)
              || (typeof key !== 'string' && !originalKey)
              || (typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length)) {
              setOriginalKey(key);
              setFilesToUpload([]);
          }
      }, [key, originalKey]);
      const onUpload = (files) => {
          setFilesToUpload(files);
          onChange(custom.fileProperty, files);
      };
      const handleRemove = () => {
          onChange(custom.fileProperty, null);
      };
      const handleMultiRemove = (singleKey) => {
          const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
          const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
          if (path && path.length > 0) {
              const newPath = path.map((currentPath, i) => (i !== index ? currentPath : null));
              let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
              newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
              onChange({
                  ...record,
                  params: newParams,
              });
          }
          else {
              // eslint-disable-next-line no-console
              console.log('You cannot remove file when there are no uploaded files yet');
          }
      };
      return (React__default.default.createElement(designSystem.FormGroup, null,
          React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
          React__default.default.createElement(designSystem.DropZone, { onChange: onUpload, multiple: custom.multiple, validate: {
                  mimeTypes: custom.mimeTypes,
                  maxSize: custom.maxSize,
              }, files: filesToUpload }),
          !custom.multiple && key && path && !filesToUpload.length && file !== null && (React__default.default.createElement(designSystem.DropZoneItem, { filename: key, src: path, onRemove: handleRemove })),
          custom.multiple && key && key.length && path ? (React__default.default.createElement(React__default.default.Fragment, null, key.map((singleKey, index) => {
              // when we remove items we set only path index to nulls.
              // key is still there. This is because
              // we have to maintain all the indexes. So here we simply filter out elements which
              // were removed and display only what was left
              const currentPath = path[index];
              return currentPath ? (React__default.default.createElement(designSystem.DropZoneItem, { key: singleKey, filename: singleKey, src: path[index], onRemove: () => handleMultiRemove(singleKey) })) : '';
          }))) : ''));
  };

  const AudioMimeTypes = [
      'audio/aac',
      'audio/midi',
      'audio/x-midi',
      'audio/mpeg',
      'audio/ogg',
      'application/ogg',
      'audio/opus',
      'audio/wav',
      'audio/webm',
      'audio/3gpp2',
  ];
  const ImageMimeTypes = [
      'image/bmp',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/vnd.microsoft.icon',
      'image/tiff',
      'image/webp',
  ];

  // eslint-disable-next-line import/no-extraneous-dependencies
  const SingleFile = (props) => {
      const { name, path, mimeType, width } = props;
      if (path && path.length) {
          if (mimeType && ImageMimeTypes.includes(mimeType)) {
              return (React__default.default.createElement("img", { src: path, style: { maxHeight: width, maxWidth: width }, alt: name }));
          }
          if (mimeType && AudioMimeTypes.includes(mimeType)) {
              return (React__default.default.createElement("audio", { controls: true, src: path },
                  "Your browser does not support the",
                  React__default.default.createElement("code", null, "audio"),
                  React__default.default.createElement("track", { kind: "captions" })));
          }
      }
      return (React__default.default.createElement(designSystem.Box, null,
          React__default.default.createElement(designSystem.Button, { as: "a", href: path, ml: "default", size: "sm", rounded: true, target: "_blank" },
              React__default.default.createElement(designSystem.Icon, { icon: "DocumentDownload", color: "white", mr: "default" }),
              name)));
  };
  const File = ({ width, record, property }) => {
      const { custom } = property;
      let path = adminjs.flat.get(record?.params, custom.filePathProperty);
      if (!path) {
          return null;
      }
      const name = adminjs.flat.get(record?.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
      const mimeType = custom.mimeTypeProperty
          && adminjs.flat.get(record?.params, custom.mimeTypeProperty);
      if (!property.custom.multiple) {
          if (custom.opts && custom.opts.baseUrl) {
              path = `${custom.opts.baseUrl}/${name}`;
          }
          return (React__default.default.createElement(SingleFile, { path: path, name: name, width: width, mimeType: mimeType }));
      }
      if (custom.opts && custom.opts.baseUrl) {
          const baseUrl = custom.opts.baseUrl || '';
          path = path.map((singlePath, index) => `${baseUrl}/${name[index]}`);
      }
      return (React__default.default.createElement(React__default.default.Fragment, null, path.map((singlePath, index) => (React__default.default.createElement(SingleFile, { key: singlePath, path: singlePath, name: name[index], width: width, mimeType: mimeType[index] })))));
  };

  const List = (props) => (React__default.default.createElement(File, { width: 100, ...props }));

  const Show = (props) => {
      const { property } = props;
      const { translateProperty } = adminjs.useTranslation();
      return (React__default.default.createElement(designSystem.FormGroup, null,
          React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
          React__default.default.createElement(File, { width: "100%", ...props })));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.GameSelect = GameSelect;
  AdminJS.UserComponents.downloadPDF = DownloadPDFButton;
  AdminJS.UserComponents.DashboardUI = DashboardUI;
  AdminJS.UserComponents.GenerateCertificates = GenerateCertificates;
  AdminJS.UserComponents.ResumeDownloadButton = ResumeDownloadButton;
  AdminJS.UserComponents.UploadEditComponent = Edit;
  AdminJS.UserComponents.UploadListComponent = List;
  AdminJS.UserComponents.UploadShowComponent = Show;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vR2FtZVNlbGVjdC5qcyIsIi4uL3NyYy9hZG1pbi9kb3dubG9hZGJ0bi5qc3giLCIuLi9zcmMvYWRtaW4vRGFzaGJvYXJkVUkuanN4IiwiLi4vc3JjL2FkbWluL0dlbmVyYXRlQ2VydGlmaWNhdGVzLmpzeCIsIi4uL3NyYy9hZG1pbi9SZXN1bWVEb3dubG9hZEJ1dHRvbi5qc3giLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkRWRpdENvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvdHlwZXMvbWltZS10eXBlcy50eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2ZpbGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkTGlzdENvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRTaG93Q29tcG9uZW50LmpzIiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2FkbWluL0dhbWVTZWxlY3QuanNcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xuXG5jb25zdCBHYW1lU2VsZWN0ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IFtnYW1lcywgc2V0R2FtZXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2VsZWN0ZWRHYW1lLCBzZXRTZWxlY3RlZEdhbWVdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmZXRjaChcIi9hcGkvZ2FtZXNcIilcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZU9wdGlvbnMgPSBkYXRhLm1hcCgoZ2FtZSkgPT4gKHtcbiAgICAgICAgICB2YWx1ZTogZ2FtZS5pZC50b1N0cmluZygpLFxuICAgICAgICAgIGxhYmVsOiBgJHtnYW1lLm5hbWV9IC0gJHtnYW1lLmNhdGVnb3J5fWAsXG4gICAgICAgIH0pKTtcbiAgICAgICAgc2V0R2FtZXMoZ2FtZU9wdGlvbnMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBnYW1lczpcIiwgZXJyb3IpKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLnZhbHVlKSB7XG4gICAgICBjb25zdCBnYW1lID0gZ2FtZXMuZmluZChnID0+IGcudmFsdWUgPT09IHByb3BzLnZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgc2V0U2VsZWN0ZWRHYW1lKGdhbWUgfHwgbnVsbCk7XG4gICAgfVxuICB9LCBbcHJvcHMudmFsdWUsIGdhbWVzXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKHNlbGVjdGVkT3B0aW9uKSA9PiB7XG5cdHNldFNlbGVjdGVkR2FtZShzZWxlY3RlZE9wdGlvbik7XG5cdGlmIChwcm9wcy5vbkNoYW5nZSkge1xuXHQgIGNvbnN0IHZhbHVlID0gc2VsZWN0ZWRPcHRpb24gPyBzZWxlY3RlZE9wdGlvbi52YWx1ZSA6IG51bGw7XG5cdCAgcHJvcHMub25DaGFuZ2UodmFsdWUpO1xuXHR9XG4gIH07XG5cbiAgLy8gSW4gR2FtZVNlbGVjdCBjb21wb25lbnRcbmNvbnNvbGUubG9nKCdTZWxlY3RlZCBnYW1lOicsIHNlbGVjdGVkR2FtZSk7XG5cbi8vIEluICdiZWZvcmUnIGhvb2tzXG5jb25zb2xlLmxvZygnUmVxdWVzdCBwYXlsb2FkOicsIHJlcXVlc3QucGF5bG9hZCk7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XG4gICAgLi4ucHJvcHMsXG4gICAgb3B0aW9uczogZ2FtZXMsXG4gICAgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSxcbiAgICB2YWx1ZTogc2VsZWN0ZWRHYW1lLFxuICAgIGlzQ2xlYXJhYmxlOiB0cnVlLFxuICAgIHBsYWNlaG9sZGVyOiBcIlNlbGVjdCBhIGdhbWUuLi5cIlxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVTZWxlY3Q7IiwiLy8gaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG4vLyBpbXBvcnQgeyBCb3gsIEJ1dHRvbiwgRGF0ZVBpY2tlciB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XG4vLyBpbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tIFwiYWRtaW5qc1wiO1xuXG4vLyBjb25zdCBEb3dubG9hZFBERkJ1dHRvbiA9IChwcm9wcykgPT4ge1xuLy8gXHRjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGUobmV3IERhdGUoKSk7XG4vLyBcdGNvbnN0IFtlbmREYXRlLCBzZXRFbmREYXRlXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkpO1xuLy8gXHRjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbi8vIFx0Y29uc3QgaGFuZGxlRG93bmxvYWQgPSBhc3luYyAoKSA9PiB7XG4vLyBcdFx0dHJ5IHtcbi8vIFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcbi8vIFx0XHRcdFx0cmVzb3VyY2VJZDogXCJQYXJ0aWNpcGF0aW9uc1wiLFxuLy8gXHRcdFx0XHRhY3Rpb25OYW1lOiBcImdlbmVyYXRlUERGXCIsXG4vLyBcdFx0XHRcdGRhdGE6IHsgc3RhcnREYXRlLCBlbmREYXRlIH0sXG4vLyBcdFx0XHR9KTtcblxuLy8gXHRcdFx0aWYgKHJlc3BvbnNlLmRhdGEudXJsKSB7XG4vLyBcdFx0XHRcdHdpbmRvdy5vcGVuKHJlc3BvbnNlLmRhdGEudXJsLCBcIl9ibGFua1wiKTtcbi8vIFx0XHRcdH0gZWxzZSB7XG4vLyBcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJObyBVUkwgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmVyXCIpO1xuLy8gXHRcdFx0fVxuLy8gXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG4vLyBcdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3IgZ2VuZXJhdGluZyBQREY6XCIsIGVycm9yKTtcbi8vIFx0XHR9XG4vLyBcdH07XG5cbi8vIFx0cmV0dXJuIChcbi8vIFx0XHQ8Qm94PlxuLy8gXHRcdFx0PERhdGVQaWNrZXJcbi8vIFx0XHRcdFx0dmFsdWU9e3N0YXJ0RGF0ZX1cbi8vIFx0XHRcdFx0b25DaGFuZ2U9eyhkYXRlKSA9PiBzZXRTdGFydERhdGUoZGF0ZSl9XG4vLyBcdFx0XHQvPlxuLy8gXHRcdFx0PERhdGVQaWNrZXIgdmFsdWU9e2VuZERhdGV9IG9uQ2hhbmdlPXsoZGF0ZSkgPT4gc2V0RW5kRGF0ZShkYXRlKX0gLz5cbi8vIFx0XHRcdDxCdXR0b24gb25DbGljaz17aGFuZGxlRG93bmxvYWR9PkdlbmVyYXRlIFBERjwvQnV0dG9uPlxuLy8gXHRcdDwvQm94PlxuLy8gXHQpO1xuLy8gfTtcblxuLy8gZXhwb3J0IGRlZmF1bHQgRG93bmxvYWRQREZCdXR0b247XG5cblxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBEYXRlUGlja2VyIH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gXCJhZG1pbmpzXCI7XG5cbmNvbnN0IERvd25sb2FkUERGQnV0dG9uID0gKHByb3BzKSA9PiB7XG5cdGNvbnN0IFtzdGFydERhdGUsIHNldFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpKTtcblx0Y29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGUobmV3IERhdGUoKSk7XG5cdGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuXHRjb25zdCBoYW5kbGVEb3dubG9hZCA9IGFzeW5jICgpID0+IHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xuXHRcdFx0XHRyZXNvdXJjZUlkOiBcInJlZ2lzdHJhdGlvbnNcIixcblx0XHRcdFx0YWN0aW9uTmFtZTogXCJnZW5lcmF0ZVBERlwiLFxuXHRcdFx0XHRkYXRhOiB7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9LFxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChyZXNwb25zZS5kYXRhLnVybCkge1xuXHRcdFx0XHR3aW5kb3cub3BlbihyZXNwb25zZS5kYXRhLnVybCwgXCJfYmxhbmtcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiTm8gVVJMIHJldHVybmVkIGZyb20gdGhlIHNlcnZlclwiKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIGdlbmVyYXRpbmcgUERGOlwiLCBlcnJvcik7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiAoXG5cdFx0PEJveD5cblx0XHRcdDxEYXRlUGlja2VyXG5cdFx0XHRcdHZhbHVlPXtzdGFydERhdGV9XG5cdFx0XHRcdG9uQ2hhbmdlPXsoZGF0ZSkgPT4gc2V0U3RhcnREYXRlKGRhdGUpfVxuXHRcdFx0Lz5cblx0XHRcdDxEYXRlUGlja2VyIHZhbHVlPXtlbmREYXRlfSBvbkNoYW5nZT17KGRhdGUpID0+IHNldEVuZERhdGUoZGF0ZSl9IC8+XG5cdFx0XHQ8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkfT5HZW5lcmF0ZSBQREY8L0J1dHRvbj5cblx0XHQ8L0JveD5cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERvd25sb2FkUERGQnV0dG9uOyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQm94LCBIMSwgVGV4dCwgVGFibGUsIFRhYmxlSGVhZCwgVGFibGVSb3csIFRhYmxlQ2VsbCB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XHJcblxyXG5jb25zdCBEYXNoYm9hcmRVSSA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPEJveCB2YXJpYW50PVwiZ3JleVwiIHBhZGRpbmc9XCJsZ1wiPlxyXG4gICAgICA8SDE+4pq9IEZvb3RiYWxsIExlYWd1ZSBEYXNoYm9hcmQ8L0gxPlxyXG4gICAgICA8VGV4dD5XZWxjb21lIHRvIHRoZSBGb290YmFsbCBMZWFndWUgTWFuYWdlbWVudCBTeXN0ZW0uPC9UZXh0PlxyXG5cclxuICAgICAgPFRhYmxlPlxyXG4gICAgICAgIDxUYWJsZUhlYWQ+XHJcbiAgICAgICAgICA8VGFibGVSb3c+XHJcbiAgICAgICAgICAgIDxUYWJsZUNlbGw+8J+PhiBMZWFndWUgTmFtZTwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgICA8VGFibGVDZWxsPvCfk4UgU3RhcnQgRGF0ZTwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgICA8VGFibGVDZWxsPvCfk40gTG9jYXRpb248L1RhYmxlQ2VsbD5cclxuICAgICAgICAgIDwvVGFibGVSb3c+XHJcbiAgICAgICAgPC9UYWJsZUhlYWQ+XHJcbiAgICAgICAgPFRhYmxlUm93PlxyXG4gICAgICAgICAgPFRhYmxlQ2VsbD5QcmVtaWVyIExlYWd1ZTwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgPFRhYmxlQ2VsbD5NYXJjaCAxMCwgMjAyNTwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgPFRhYmxlQ2VsbD5Mb25kb248L1RhYmxlQ2VsbD5cclxuICAgICAgICA8L1RhYmxlUm93PlxyXG4gICAgICAgIDxUYWJsZVJvdz5cclxuICAgICAgICAgIDxUYWJsZUNlbGw+Q2hhbXBpb25zIExlYWd1ZTwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgPFRhYmxlQ2VsbD5BcHJpbCAxNSwgMjAyNTwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgPFRhYmxlQ2VsbD5QYXJpczwvVGFibGVDZWxsPlxyXG4gICAgICAgIDwvVGFibGVSb3c+XHJcbiAgICAgIDwvVGFibGU+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkVUk7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQm94LCBIMiwgVGV4dCwgQnV0dG9uLCBMaW5rIH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcblxuY29uc3QgR2VuZXJhdGVDZXJ0aWZpY2F0ZXMgPSAocHJvcHMpID0+IHtcblx0Y29uc3QgeyByZWNvcmQgfSA9IHByb3BzO1xuXHRjb25zdCBbaXNHZW5lcmF0aW5nLCBzZXRJc0dlbmVyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXHRjb25zdCBbcGRmVXJsLCBzZXRQZGZVcmxdID0gdXNlU3RhdGUobnVsbCk7XG5cblx0Y29uc3QgaGFuZGxlR2VuZXJhdGVDZXJ0aWZpY2F0ZXMgPSBhc3luYyAoKSA9PiB7XG5cdFx0c2V0SXNHZW5lcmF0aW5nKHRydWUpO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0XHRgL2FkbWluL2FwaS9yZXNvdXJjZXMvQ2VydGlmaWNhdGUvcmVjb3Jkcy8ke3JlY29yZC5pZH0vZ2VuZXJhdGVDZXJ0aWZpY2F0ZXNgLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRpZiAoZGF0YS5tc2cpIHtcblx0XHRcdFx0YWxlcnQoZGF0YS5tc2cpO1xuXHRcdFx0XHQvLyBVc2UgdGhlIGZpbGVuYW1lIHJldHVybmVkIGZyb20gdGhlIHNlcnZlclxuXHRcdFx0XHRzZXRQZGZVcmwoYC9hcGkvZG93bmxvYWQtY2VydGlmaWNhdGVzLyR7ZGF0YS5wZGZGaWxlbmFtZX1gKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIGdlbmVyYXRpbmcgY2VydGlmaWNhdGVzOlwiLCBlcnJvcik7XG5cdFx0XHRhbGVydChcIkZhaWxlZCB0byBnZW5lcmF0ZSBjZXJ0aWZpY2F0ZXNcIik7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdHNldElzR2VuZXJhdGluZyhmYWxzZSk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiAoXG5cdFx0PEJveD5cblx0XHRcdDxIMj5HZW5lcmF0ZSBDZXJ0aWZpY2F0ZXM8L0gyPlxuXHRcdFx0PFRleHQ+XG5cdFx0XHRcdENsaWNrIHRoZSBidXR0b24gYmVsb3cgdG8gZ2VuZXJhdGUgY2VydGlmaWNhdGVzIHVzaW5nIHRoZVxuXHRcdFx0XHR1cGxvYWRlZCBFeGNlbCBmaWxlLlxuXHRcdFx0PC9UZXh0PlxuXHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZUNlcnRpZmljYXRlc31cblx0XHRcdFx0ZGlzYWJsZWQ9e2lzR2VuZXJhdGluZ31cblx0XHRcdD5cblx0XHRcdFx0e2lzR2VuZXJhdGluZyA/IFwiR2VuZXJhdGluZy4uLlwiIDogXCJHZW5lcmF0ZSBDZXJ0aWZpY2F0ZXNcIn1cblx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0e3BkZlVybCAmJiAoXG5cdFx0XHRcdDxCb3ggbXQ9XCJ4bFwiPlxuXHRcdFx0XHRcdDxUZXh0PkNlcnRpZmljYXRlcyBnZW5lcmF0ZWQgc3VjY2Vzc2Z1bGx5ITwvVGV4dD5cblx0XHRcdFx0XHQ8TGluayBocmVmPXtwZGZVcmx9IHRhcmdldD1cIl9ibGFua1wiPlxuXHRcdFx0XHRcdFx0RG93bmxvYWQgQ2VydGlmaWNhdGVzIChQREYpXG5cdFx0XHRcdFx0PC9MaW5rPlxuXHRcdFx0XHQ8L0JveD5cblx0XHRcdCl9XG5cdFx0PC9Cb3g+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHZW5lcmF0ZUNlcnRpZmljYXRlcztcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XG5cbmNvbnN0IFJlc3VtZURvd25sb2FkQnV0dG9uID0gKHsgcmVjb3JkIH0pID0+IHtcblx0Y29uc3QgcmVzdW1lVXJsID0gcmVjb3JkLnBhcmFtcy5yZXN1bWVVcmw7XG5cblx0aWYgKCFyZXN1bWVVcmwpIHJldHVybiA8c3Bhbj5ObyByZXN1bWUgdXBsb2FkZWQ8L3NwYW4+O1xuXG5cdHJldHVybiAoXG5cdFx0PEJ1dHRvblxuXHRcdFx0YXM9XCJhXCJcblx0XHRcdGhyZWY9e3Jlc3VtZVVybH1cblx0XHRcdGRvd25sb2FkXG5cdFx0XHR0YXJnZXQ9XCJfYmxhbmtcIlxuXHRcdFx0cmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG5cdFx0PlxuXHRcdFx0RG93bmxvYWQgUmVzdW1lXG5cdFx0PC9CdXR0b24+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXN1bWVEb3dubG9hZEJ1dHRvbjtcbiIsImltcG9ydCB7IERyb3Bab25lLCBEcm9wWm9uZUl0ZW0sIEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQsIHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmNvbnN0IEVkaXQgPSAoeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSB9KSA9PiB7XG4gICAgY29uc3QgeyB0cmFuc2xhdGVQcm9wZXJ0eSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkO1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBjb25zdCBwYXRoID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgY29uc3Qga2V5ID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IGZpbGUgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUHJvcGVydHkpO1xuICAgIGNvbnN0IFtvcmlnaW5hbEtleSwgc2V0T3JpZ2luYWxLZXldID0gdXNlU3RhdGUoa2V5KTtcbiAgICBjb25zdCBbZmlsZXNUb1VwbG9hZCwgc2V0RmlsZXNUb1VwbG9hZF0gPSB1c2VTdGF0ZShbXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gaXQgbWVhbnMgbWVhbnMgdGhhdCBzb21lb25lIGhpdCBzYXZlIGFuZCBuZXcgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgICAgICAvLyBpbiB0aGlzIGNhc2UgZmxpZXNUb1VwbG9hZCBzaG91bGQgYmUgY2xlYXJlZC5cbiAgICAgICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gdXNlciB0dXJucyBvZmYgcmVkaXJlY3QgYWZ0ZXIgbmV3L2VkaXRcbiAgICAgICAgaWYgKCh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkgIT09IG9yaWdpbmFsS2V5KVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmICFvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiBBcnJheS5pc0FycmF5KGtleSkgJiYga2V5Lmxlbmd0aCAhPT0gb3JpZ2luYWxLZXkubGVuZ3RoKSkge1xuICAgICAgICAgICAgc2V0T3JpZ2luYWxLZXkoa2V5KTtcbiAgICAgICAgICAgIHNldEZpbGVzVG9VcGxvYWQoW10pO1xuICAgICAgICB9XG4gICAgfSwgW2tleSwgb3JpZ2luYWxLZXldKTtcbiAgICBjb25zdCBvblVwbG9hZCA9IChmaWxlcykgPT4ge1xuICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKGZpbGVzKTtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgZmlsZXMpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBvbkNoYW5nZShjdXN0b20uZmlsZVByb3BlcnR5LCBudWxsKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU11bHRpUmVtb3ZlID0gKHNpbmdsZUtleSkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IChmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20ua2V5UHJvcGVydHkpIHx8IFtdKS5pbmRleE9mKHNpbmdsZUtleSk7XG4gICAgICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5KSB8fCBbXTtcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5tYXAoKGN1cnJlbnRQYXRoLCBpKSA9PiAoaSAhPT0gaW5kZXggPyBjdXJyZW50UGF0aCA6IG51bGwpKTtcbiAgICAgICAgICAgIGxldCBuZXdQYXJhbXMgPSBmbGF0LnNldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5LCBbLi4uZmlsZXNUb0RlbGV0ZSwgaW5kZXhdKTtcbiAgICAgICAgICAgIG5ld1BhcmFtcyA9IGZsYXQuc2V0KG5ld1BhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHksIG5ld1BhdGgpO1xuICAgICAgICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG5ld1BhcmFtcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2Fubm90IHJlbW92ZSBmaWxlIHdoZW4gdGhlcmUgYXJlIG5vIHVwbG9hZGVkIGZpbGVzIHlldCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCBudWxsLCB0cmFuc2xhdGVQcm9wZXJ0eShwcm9wZXJ0eS5sYWJlbCwgcHJvcGVydHkucmVzb3VyY2VJZCkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lLCB7IG9uQ2hhbmdlOiBvblVwbG9hZCwgbXVsdGlwbGU6IGN1c3RvbS5tdWx0aXBsZSwgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IGN1c3RvbS5taW1lVHlwZXMsXG4gICAgICAgICAgICAgICAgbWF4U2l6ZTogY3VzdG9tLm1heFNpemUsXG4gICAgICAgICAgICB9LCBmaWxlczogZmlsZXNUb1VwbG9hZCB9KSxcbiAgICAgICAgIWN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYgcGF0aCAmJiAhZmlsZXNUb1VwbG9hZC5sZW5ndGggJiYgZmlsZSAhPT0gbnVsbCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsgZmlsZW5hbWU6IGtleSwgc3JjOiBwYXRoLCBvblJlbW92ZTogaGFuZGxlUmVtb3ZlIH0pKSxcbiAgICAgICAgY3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBrZXkubGVuZ3RoICYmIHBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwga2V5Lm1hcCgoc2luZ2xlS2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSByZW1vdmUgaXRlbXMgd2Ugc2V0IG9ubHkgcGF0aCBpbmRleCB0byBudWxscy5cbiAgICAgICAgICAgIC8vIGtleSBpcyBzdGlsbCB0aGVyZS4gVGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIG1haW50YWluIGFsbCB0aGUgaW5kZXhlcy4gU28gaGVyZSB3ZSBzaW1wbHkgZmlsdGVyIG91dCBlbGVtZW50cyB3aGljaFxuICAgICAgICAgICAgLy8gd2VyZSByZW1vdmVkIGFuZCBkaXNwbGF5IG9ubHkgd2hhdCB3YXMgbGVmdFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoW2luZGV4XTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KERyb3Bab25lSXRlbSwgeyBrZXk6IHNpbmdsZUtleSwgZmlsZW5hbWU6IHNpbmdsZUtleSwgc3JjOiBwYXRoW2luZGV4XSwgb25SZW1vdmU6ICgpID0+IGhhbmRsZU11bHRpUmVtb3ZlKHNpbmdsZUtleSkgfSkpIDogJyc7XG4gICAgICAgIH0pKSkgOiAnJykpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEVkaXQ7XG4iLCJleHBvcnQgY29uc3QgQXVkaW9NaW1lVHlwZXMgPSBbXG4gICAgJ2F1ZGlvL2FhYycsXG4gICAgJ2F1ZGlvL21pZGknLFxuICAgICdhdWRpby94LW1pZGknLFxuICAgICdhdWRpby9tcGVnJyxcbiAgICAnYXVkaW8vb2dnJyxcbiAgICAnYXBwbGljYXRpb24vb2dnJyxcbiAgICAnYXVkaW8vb3B1cycsXG4gICAgJ2F1ZGlvL3dhdicsXG4gICAgJ2F1ZGlvL3dlYm0nLFxuICAgICdhdWRpby8zZ3BwMicsXG5dO1xuZXhwb3J0IGNvbnN0IFZpZGVvTWltZVR5cGVzID0gW1xuICAgICd2aWRlby94LW1zdmlkZW8nLFxuICAgICd2aWRlby9tcGVnJyxcbiAgICAndmlkZW8vb2dnJyxcbiAgICAndmlkZW8vbXAydCcsXG4gICAgJ3ZpZGVvL3dlYm0nLFxuICAgICd2aWRlby8zZ3BwJyxcbiAgICAndmlkZW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBJbWFnZU1pbWVUeXBlcyA9IFtcbiAgICAnaW1hZ2UvYm1wJyxcbiAgICAnaW1hZ2UvZ2lmJyxcbiAgICAnaW1hZ2UvanBlZycsXG4gICAgJ2ltYWdlL3BuZycsXG4gICAgJ2ltYWdlL3N2Zyt4bWwnLFxuICAgICdpbWFnZS92bmQubWljcm9zb2Z0Lmljb24nLFxuICAgICdpbWFnZS90aWZmJyxcbiAgICAnaW1hZ2Uvd2VicCcsXG5dO1xuZXhwb3J0IGNvbnN0IENvbXByZXNzZWRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcDInLFxuICAgICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgICAnYXBwbGljYXRpb24vamF2YS1hcmNoaXZlJyxcbiAgICAnYXBwbGljYXRpb24veC10YXInLFxuICAgICdhcHBsaWNhdGlvbi96aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnLFxuXTtcbmV4cG9ydCBjb25zdCBEb2N1bWVudE1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24veC1hYml3b3JkJyxcbiAgICAnYXBwbGljYXRpb24veC1mcmVlYXJjJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vaycsXG4gICAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQucmFyJyxcbiAgICAnYXBwbGljYXRpb24vcnRmJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXTtcbmV4cG9ydCBjb25zdCBUZXh0TWltZVR5cGVzID0gW1xuICAgICd0ZXh0L2NzcycsXG4gICAgJ3RleHQvY3N2JyxcbiAgICAndGV4dC9odG1sJyxcbiAgICAndGV4dC9jYWxlbmRhcicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICdhcHBsaWNhdGlvbi9sZCtqc29uJyxcbiAgICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAndGV4dC9wbGFpbicsXG4gICAgJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3htbCcsXG4gICAgJ3RleHQveG1sJyxcbl07XG5leHBvcnQgY29uc3QgQmluYXJ5RG9jc01pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuICAgICdhcHBsaWNhdGlvbi9wZGYnLFxuXTtcbmV4cG9ydCBjb25zdCBGb250TWltZVR5cGVzID0gW1xuICAgICdmb250L290ZicsXG4gICAgJ2ZvbnQvdHRmJyxcbiAgICAnZm9udC93b2ZmJyxcbiAgICAnZm9udC93b2ZmMicsXG5dO1xuZXhwb3J0IGNvbnN0IE90aGVyTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICdhcHBsaWNhdGlvbi94LWNzaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5pbnN0YWxsZXIreG1sJyxcbiAgICAnYXBwbGljYXRpb24veC1odHRwZC1waHAnLFxuICAgICdhcHBsaWNhdGlvbi94LXNoJyxcbiAgICAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAgICd2bmQudmlzaW8nLFxuICAgICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJyxcbl07XG5leHBvcnQgY29uc3QgTWltZVR5cGVzID0gW1xuICAgIC4uLkF1ZGlvTWltZVR5cGVzLFxuICAgIC4uLlZpZGVvTWltZVR5cGVzLFxuICAgIC4uLkltYWdlTWltZVR5cGVzLFxuICAgIC4uLkNvbXByZXNzZWRNaW1lVHlwZXMsXG4gICAgLi4uRG9jdW1lbnRNaW1lVHlwZXMsXG4gICAgLi4uVGV4dE1pbWVUeXBlcyxcbiAgICAuLi5CaW5hcnlEb2NzTWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuICAgIC4uLkZvbnRNaW1lVHlwZXMsXG4gICAgLi4uT3RoZXJNaW1lVHlwZXMsXG5dO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IGZsYXQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBdWRpb01pbWVUeXBlcywgSW1hZ2VNaW1lVHlwZXMgfSBmcm9tICcuLi90eXBlcy9taW1lLXR5cGVzLnR5cGUuanMnO1xuY29uc3QgU2luZ2xlRmlsZSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgcGF0aCwgbWltZVR5cGUsIHdpZHRoIH0gPSBwcm9wcztcbiAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgICAgICBpZiAobWltZVR5cGUgJiYgSW1hZ2VNaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IHBhdGgsIHN0eWxlOiB7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9LCBhbHQ6IG5hbWUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIsIHsgY29udHJvbHM6IHRydWUsIHNyYzogcGF0aCB9LFxuICAgICAgICAgICAgICAgIFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlXCIsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCJhdWRpb1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJhY2tcIiwgeyBraW5kOiBcImNhcHRpb25zXCIgfSkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBhczogXCJhXCIsIGhyZWY6IHBhdGgsIG1sOiBcImRlZmF1bHRcIiwgc2l6ZTogXCJzbVwiLCByb3VuZGVkOiB0cnVlLCB0YXJnZXQ6IFwiX2JsYW5rXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiBcIkRvY3VtZW50RG93bmxvYWRcIiwgY29sb3I6IFwid2hpdGVcIiwgbXI6IFwiZGVmYXVsdFwiIH0pLFxuICAgICAgICAgICAgbmFtZSkpKTtcbn07XG5jb25zdCBGaWxlID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICAgIGNvbnN0IHsgY3VzdG9tIH0gPSBwcm9wZXJ0eTtcbiAgICBsZXQgcGF0aCA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSk7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBuYW1lID0gZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5maWxlTmFtZVByb3BlcnR5ID8gY3VzdG9tLmZpbGVOYW1lUHJvcGVydHkgOiBjdXN0b20ua2V5UHJvcGVydHkpO1xuICAgIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHlcbiAgICAgICAgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KTtcbiAgICBpZiAoIXByb3BlcnR5LmN1c3RvbS5tdWx0aXBsZSkge1xuICAgICAgICBpZiAoY3VzdG9tLm9wdHMgJiYgY3VzdG9tLm9wdHMuYmFzZVVybCkge1xuICAgICAgICAgICAgcGF0aCA9IGAke2N1c3RvbS5vcHRzLmJhc2VVcmx9LyR7bmFtZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IHBhdGg6IHBhdGgsIG5hbWU6IG5hbWUsIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlIH0pKTtcbiAgICB9XG4gICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGN1c3RvbS5vcHRzLmJhc2VVcmwgfHwgJyc7XG4gICAgICAgIHBhdGggPSBwYXRoLm1hcCgoc2luZ2xlUGF0aCwgaW5kZXgpID0+IGAke2Jhc2VVcmx9LyR7bmFtZVtpbmRleF19YCk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaW5nbGVGaWxlLCB7IGtleTogc2luZ2xlUGF0aCwgcGF0aDogc2luZ2xlUGF0aCwgbmFtZTogbmFtZVtpbmRleF0sIHdpZHRoOiB3aWR0aCwgbWltZVR5cGU6IG1pbWVUeXBlW2luZGV4XSB9KSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRmlsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgTGlzdCA9IChwcm9wcykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogMTAwLCAuLi5wcm9wcyB9KSk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuIiwiaW1wb3J0IHsgRm9ybUdyb3VwLCBMYWJlbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUuanMnO1xuY29uc3QgU2hvdyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgcHJvcGVydHkgfSA9IHByb3BzO1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGaWxlLCB7IHdpZHRoOiBcIjEwMCVcIiwgLi4ucHJvcHMgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaG93O1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgR2FtZVNlbGVjdCBmcm9tICcuLi9zcmMvYWRtaW4vR2FtZVNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuR2FtZVNlbGVjdCA9IEdhbWVTZWxlY3RcbmltcG9ydCBkb3dubG9hZFBERiBmcm9tICcuLi9zcmMvYWRtaW4vZG93bmxvYWRidG4nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLmRvd25sb2FkUERGID0gZG93bmxvYWRQREZcbmltcG9ydCBEYXNoYm9hcmRVSSBmcm9tICcuLi9zcmMvYWRtaW4vRGFzaGJvYXJkVUknXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZFVJID0gRGFzaGJvYXJkVUlcbmltcG9ydCBHZW5lcmF0ZUNlcnRpZmljYXRlcyBmcm9tICcuLi9zcmMvYWRtaW4vR2VuZXJhdGVDZXJ0aWZpY2F0ZXMnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkdlbmVyYXRlQ2VydGlmaWNhdGVzID0gR2VuZXJhdGVDZXJ0aWZpY2F0ZXNcbmltcG9ydCBSZXN1bWVEb3dubG9hZEJ1dHRvbiBmcm9tICcuLi9zcmMvYWRtaW4vUmVzdW1lRG93bmxvYWRCdXR0b24nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJlc3VtZURvd25sb2FkQnV0dG9uID0gUmVzdW1lRG93bmxvYWRCdXR0b25cbmltcG9ydCBVcGxvYWRFZGl0Q29tcG9uZW50IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRFZGl0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRFZGl0Q29tcG9uZW50ID0gVXBsb2FkRWRpdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZExpc3RDb21wb25lbnQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZExpc3RDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZExpc3RDb21wb25lbnQgPSBVcGxvYWRMaXN0Q29tcG9uZW50XG5pbXBvcnQgVXBsb2FkU2hvd0NvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkU2hvd0NvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXBsb2FkU2hvd0NvbXBvbmVudCA9IFVwbG9hZFNob3dDb21wb25lbnQiXSwibmFtZXMiOlsiR2FtZVNlbGVjdCIsInByb3BzIiwiZ2FtZXMiLCJzZXRHYW1lcyIsInVzZVN0YXRlIiwic2VsZWN0ZWRHYW1lIiwic2V0U2VsZWN0ZWRHYW1lIiwidXNlRWZmZWN0IiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImdhbWVPcHRpb25zIiwibWFwIiwiZ2FtZSIsInZhbHVlIiwiaWQiLCJ0b1N0cmluZyIsImxhYmVsIiwibmFtZSIsImNhdGVnb3J5IiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJmaW5kIiwiZyIsImhhbmRsZUNoYW5nZSIsInNlbGVjdGVkT3B0aW9uIiwib25DaGFuZ2UiLCJsb2ciLCJyZXF1ZXN0IiwicGF5bG9hZCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIlNlbGVjdCIsIm9wdGlvbnMiLCJpc0NsZWFyYWJsZSIsInBsYWNlaG9sZGVyIiwiRG93bmxvYWRQREZCdXR0b24iLCJzdGFydERhdGUiLCJzZXRTdGFydERhdGUiLCJEYXRlIiwiZW5kRGF0ZSIsInNldEVuZERhdGUiLCJhcGkiLCJBcGlDbGllbnQiLCJoYW5kbGVEb3dubG9hZCIsInJlc291cmNlQWN0aW9uIiwicmVzb3VyY2VJZCIsImFjdGlvbk5hbWUiLCJ1cmwiLCJ3aW5kb3ciLCJvcGVuIiwiQm94IiwiRGF0ZVBpY2tlciIsImRhdGUiLCJCdXR0b24iLCJvbkNsaWNrIiwiRGFzaGJvYXJkVUkiLCJ2YXJpYW50IiwicGFkZGluZyIsIkgxIiwiVGV4dCIsIlRhYmxlIiwiVGFibGVIZWFkIiwiVGFibGVSb3ciLCJUYWJsZUNlbGwiLCJHZW5lcmF0ZUNlcnRpZmljYXRlcyIsInJlY29yZCIsImlzR2VuZXJhdGluZyIsInNldElzR2VuZXJhdGluZyIsInBkZlVybCIsInNldFBkZlVybCIsImhhbmRsZUdlbmVyYXRlQ2VydGlmaWNhdGVzIiwibWV0aG9kIiwibXNnIiwiYWxlcnQiLCJwZGZGaWxlbmFtZSIsIkgyIiwiZGlzYWJsZWQiLCJtdCIsIkxpbmsiLCJocmVmIiwidGFyZ2V0IiwiUmVzdW1lRG93bmxvYWRCdXR0b24iLCJyZXN1bWVVcmwiLCJwYXJhbXMiLCJhcyIsImRvd25sb2FkIiwicmVsIiwidXNlVHJhbnNsYXRpb24iLCJmbGF0IiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJEcm9wWm9uZSIsIkRyb3Bab25lSXRlbSIsIkljb24iLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJkb3dubG9hZFBERiIsIlVwbG9hZEVkaXRDb21wb25lbnQiLCJVcGxvYWRMaXN0Q29tcG9uZW50IiwiVXBsb2FkU2hvd0NvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUFBO0VBSUEsTUFBTUEsVUFBVSxHQUFJQyxLQUFLLElBQUs7SUFDNUIsTUFBTSxDQUFDQyxLQUFLLEVBQUVDLFFBQVEsQ0FBQyxHQUFHQyxjQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3RDLE1BQU0sQ0FBQ0MsWUFBWSxFQUFFQyxlQUFlLENBQUMsR0FBR0YsY0FBUSxDQUFDLElBQUksQ0FBQztFQUV0REcsRUFBQUEsZUFBUyxDQUFDLE1BQU07RUFDZEMsSUFBQUEsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUNoQkMsSUFBSSxDQUFFQyxRQUFRLElBQUtBLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFLENBQUMsQ0FDbkNGLElBQUksQ0FBRUcsSUFBSSxJQUFLO0VBQ2QsTUFBQSxNQUFNQyxXQUFXLEdBQUdELElB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
