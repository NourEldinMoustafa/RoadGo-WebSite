using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using RoadGoAPI.Models;

#nullable disable

namespace RoadGoAPI.Migrations
{
    public partial class step2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "HireingDate",
                table: "Drivers",
                nullable: false,
                defaultValueSql: "GETDATE()"
                );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "HireingDate",
                table: "Drivers",
                nullable: false
                );
        }

    }
}
